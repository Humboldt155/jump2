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
    const list = state.attributesAll
    for (let att in list) {
      if (list.hasOwnProperty(att)) {
        
        console.log(list[att])
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
                  russian_name: valuesList[valueID]['russian_name'],
                  qty: 0})
              } else {
                attList[attId] = {
                  id: respA['id'],
                  is_open: respA['is_open'] ? 'открытый' : 'закрытый',
                  french_name: respA['french_name'],
                  english_name: respA['english_name'],
                  russian_name: respA['russian_name'],
                  qty: 0,
                  percentage: 0,
                  _cellVariants: {is_open: respA['is_open'] ? 'light' : 'secondary'},
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
