import axios from 'axios'

const urlLinks = 'http://humboldt155.pythonanywhere.com/api/links/'
const urlAttributes = 'http://humboldt155.pythonanywhere.com/api/attributes/'
const urlValues = 'http://humboldt155.pythonanywhere.com/api/values/'
const urlModels = 'http://humboldt155.pythonanywhere.com/api/models/'

function wait (ms) {
  var start = new Date().getTime()
  var end = start
  while (end < start + ms) {
    end = new Date().getTime()
  }
}

// initial state
const state = {
  attributesAll: {},
  attributesArray: [],
  attributeLinks: [],
  valueLinks: [],
  attProducts: [],
  attProd: []
}

// mutations
const mutations = {
  emptyAttributesArray (state) {
    state.attributesArray = []
  },
  setAttProd (state, attId) {
    let attProd = state.attProducts.filter(function (p) {
      // Применяем фильтр, чтобы исключить из списка ненужные атрибуты
      return p[attId] !== '' && p.hasOwnProperty(attId)
    })
    state.attProd = attProd
  },
  setAttProducts (state, products) {
    state.attProducts = products
  },
  setAttributesAll (state, attributesAll) {
    state.attributesAll = attributesAll
  },
  setAttributeLinks (state, attId) {
    axios.get(urlLinks, {
      params: {
        attribute: attId
      }
    })
      .then(response => {
        let links = {}
        const resp = response.data
        state.attributeLinks = []
        for (let i = 0; i < resp.length; i++) {
          let model = resp[i]['model']
          links[model] = resp[i]['value']
        }
        for (let l in links) {
          if (links.hasOwnProperty(l)) {
            state.attributeLinks.push({dep: '', model: l, name: '', valueId: links[l], valueName: ''})
          }
        }
        state.attributeLinks = state.attributeLinks.slice(0, 100)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  setLinksNames (state) {
    for (let i = 0; i < state.attributeLinks.length; i++) {
      let link = state.attributeLinks[i]
      axios.get(urlModels, {
        params: {
          id: link.model
        }
      })
        .then(response => {
          const resp = response.data
          state.attributeLinks[i]['name'] = resp[0].russian_name
          state.attributeLinks[i]['dep'] = resp[0].model_group_adeo.slice(4, 6)
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get(urlValues, {
        params: {
          id: link.valueId
        }
      })
        .then(response => {
          const resp = response.data
          state.attributeLinks[i]['valueName'] = resp[0].russian_name
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  setValues (state, att) {
    if (state.attributesAll[att]['is_open'] === 'открытый') {
      state.attributesAll[att]['values'] = []
      let valuesDict = {}
      for (let i = 0; i < state.attProd.length; i++) {
        let value = state.attProd[i][att]
        if (value in valuesDict) {
          valuesDict[value].qty = valuesDict[value].qty + 1
          valuesDict[value].products.push(state.attProd[i]['Код продукта'])
        } else {
          valuesDict[value] = {russian_name: value, qty: 1, id: '-', products: [state.attProd[i]['Код продукта']]}
        }
      }
      for (let value in valuesDict) {
        if (valuesDict.hasOwnProperty(value)) {
          state.attributesAll[att]['values'].push(valuesDict[value])
        }
      }
    } else {
      let valuesList = []
      let attsDict = {}
      for (let i = 0; i < state.attProd.length; i++) {
        if (state.attProd[i][att] in attsDict) {
          attsDict[state.attProd[i][att]] = attsDict[state.attProd[i][att]] + 1
        } else {
          attsDict[state.attProd[i][att]] = 1
        }
      }
      let values = state.attributesAll[att]['values']
      for (let i = 0; i < values.length; i++) {
        let valueID = values[i].id
        valuesList.push(values[i].russian_name)
        // Обращаемся к таблице значений, чтобы получить данные о значениях
        axios.get(urlValues, {
          params: {
            id: valueID
          }
        })
          .then(response => {
            const respV = response.data[0]
            state.attributesAll[att]['values'][i]['id'] = respV['id']
            state.attributesAll[att]['values'][i]['french_name'] = respV['french_name']
            state.attributesAll[att]['values'][i]['english_name'] = respV['english_name']
            state.attributesAll[att]['values'][i]['russian_name'] = respV['russian_name']
            state.attributesAll[att]['values'][i]['qty'] = attsDict[respV['russian_name']]
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  },
  setAttributesArray (state, products) {
    state.attributesArray = []
    const totalQty = products.length

    for (let i = 0; i < totalQty; i++) {
      let p = products[i]
      for (let a in p) {
        if (p.hasOwnProperty(a)) {
          p[a.slice(0, 9)] = p[a]
        }
      }
      products[i] = p
    }

    const list = state.attributesAll
    for (let att in list) {
      if (list.hasOwnProperty(att)) {
        let attProd = products.filter(function (p) {
          // Применяем фильтр, чтобы исключить из списка ненужные атрибуты
          return p[att] !== '' && p.hasOwnProperty(att)
        })
        list[att].qty = attProd.length > 0 ? attProd.length : ''
        list[att].percentage = attProd.length > 0 ? Math.round(attProd.length / totalQty * 100) : ''
        list[att]['_cellVariants'].id = attProd.length > 0 ? 'light' : 'secondary'
        state.attributesArray.push(list[att])
      }
    }
  }
}

// getters
const getters = {
  attributesAll: state => state.attributesAll,
  attributeLinks: state => state.attributeLinks,
  attProd: state => state.attProd,
  valueLinks: state => state.valueLinks,
  attributesArray: state => state.attributesArray
}

// actions
const actions = {
  setModelLinks (vuexContext, modelId) {
    // Запрашиваем все связи по текущей модели
    let attList = {}
    axios.get(urlLinks, {
      params: {
        // Передаем код модели
        model: 'MOD_'.concat(modelId)
      }
    })
      .then(response => {
        // Получаем ответ, все связи записываем в переменную resp
        const resp = response.data
        // Проходим циклом по всем связям, получаем словарь атрибутов
        for (let i = 0; i < resp.length; i++) {
          const attId = resp[i]['attribute']
          const valueID = resp[i]['value']
          // Обращаемся к таблице значений, чтобы получить данные о значениях
          // axios.get(urlValues, {
          //   params: {
          //     id: valueID
          //   }
          // })
          //   .then(response => {
          //     const respV = response.data[0]
          //     valuesList[valueID] = {
          //       'id': respV['id'],
          //       'french_name': respV['french_name'],
          //       'english_name': respV['english_name'],
          //       'russian_name': respV['russian_name']
          //     }
          //   })
          //   .catch(e => {
          //     this.errors.push(e)
          //   })
          // Обращаемся к таблице атрибутов, чтобы получить данные об атрибутах
          axios.get(urlAttributes, {
            params: {
              id: attId
            }
          })
            .then(response => {
              const respA = response.data[0]
              if (attId in attList) {
                attList[attId]['values'].push({
                  id: valueID,
                  french_name: '',
                  english_name: '',
                  russian_name: '',
                  qty: 0,
                  products: []
                })
              } else {
                attList[attId] = {
                  id: respA['id'],
                  is_open: respA['is_open'] ? 'открытый' : 'закрытый',
                  french_name: respA['french_name'],
                  english_name: respA['english_name'],
                  russian_name: respA['russian_name'],
                  qty: 0,
                  percentage: 0,
                  _cellVariants: {is_open: respA['is_open'] ? 'light' : 'secondary', id: 'secondary'},
                  values: !respA['is_open'] ? [{
                    id: valueID,
                    french_name: '',
                    english_name: '',
                    russian_name: '',
                    qty: 0,
                    products: []
                  }] : []
                }
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    vuexContext.commit('setAttributesAll', attList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
