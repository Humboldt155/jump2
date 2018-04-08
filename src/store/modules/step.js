import axios from 'axios'

const urlLinks = 'http://humboldt155.pythonanywhere.com/api/links/'
const urlAttributes = 'http://humboldt155.pythonanywhere.com/api/attributes/'
const urlValues = 'http://humboldt155.pythonanywhere.com/api/values/'

// initial state
const state = {
  attributesAll: {},
  attributesArray: []
}

// mutations
const mutations = {
  setAttributesAll (state, attributesAll) {
    state.attributesAll = attributesAll
  },
  setAttributesArray (state, products) {
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
        list[att].qty = attProd.length
        list[att].percentage = Math.round(attProd.length / totalQty * 100)
        list[att]['_cellVariants'].id = attProd.length > 0 ? 'light' : 'secondary'
        for (let i = 0; i < list[att]['values'].length; i++) {
          let name = list[att]['values'][i]['russian_name']
          let valProd = attProd.filter(function (pV) {
          // Применяем фильтр, чтобы исключить из списка ненужные атрибуты
            return pV[att].toString() === name.toString()
          })
          list[att]['values'][i]['qty'] = valProd.length
          console.log(list[att]['values'][i]['qty'])
        }
        state.attributesArray.push(list[att])
      }
    }
  }
}

// getters
const getters = {
  attributesAll: state => state.attributesAll,
  attributesArray: state => state.attributesArray
}

// actions
const actions = {
  setModelLinks (vuexContext, modelId) {
    // Запрашиваем все связи по текущей модели
    let attList = {}
    let valuesList = {}
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
          axios.get(urlValues, {
            params: {
              id: valueID
            }
          })
            .then(response => {
              const respV = response.data[0]
              valuesList[valueID] = {
                'id': respV['id'],
                'french_name': respV['french_name'],
                'english_name': respV['english_name'],
                'russian_name': respV['russian_name']
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
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
                  french_name: valuesList[valueID]['french_name'],
                  english_name: valuesList[valueID]['english_name'],
                  russian_name: valuesList[valueID]['russian_name'],
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
                    french_name: valuesList[valueID]['french_name'],
                    english_name: valuesList[valueID]['english_name'],
                    russian_name: valuesList[valueID]['russian_name'],
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
