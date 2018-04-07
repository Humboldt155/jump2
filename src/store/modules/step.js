import axios from 'axios'

const urlLinks = 'http://127.0.0.1:8000/api/links/'
const urlAttributes = 'http://127.0.0.1:8000/api/attributes/'
const urlValues = 'http://127.0.0.1:8000/api/values/'

// initial state
const state = {
  modelLinks: '',
  attributesAll: {},
  valuesAll: {}
}

// mutations
const mutations = {
  setAttributesAll (state, attributesAll) {
    state.attributesAll = attributesAll
  },
  setValuesAll (state, valuesAll) {
    state.valuesAll = valuesAll
  }
  // setModelLinks (state, modelId) {
  //   // Запрашиваем все связи по текущей модели
  //   axios.get(urlLinks, {
  //     params: {
  //       // Передаем код модели
  //       model: modelId
  //     }
  //   })
  //     .then(response => {
  //       // Получаем ответ, все связи записываем в переменную resp
  //       const resp = response.data
  //       // Проходим циклом по всем связям, получаем словарь атрибутов
  //       for (let i = 0; i < resp.length; i++) {
  //         const attId = resp[i]['attribute']
  //         // Обращаемся к таблице атрибутов, чтобы получить данные об атрибутах
  //         axios.get(urlAttributes, {
  //           params: {
  //             id: attId
  //           }
  //         })
  //           .then(response => {
  //             const respA = response.data[0]
  //             state.attributesAll[attId] = {
  //               'code': respA['id'],
  //               'is_open': respA['is_open'],
  //               'french_name': respA['french_name'],
  //               'english_name': respA['english_name'],
  //               'russian_name': respA['russian_name']
  //             }
  //           })
  //           .catch(e => {
  //             this.errors.push(e)
  //           })
  //       }
  //     })
  //     .catch(e => {
  //       this.errors.push(e)
  //     })
  // }
}

// getters
const getters = {
  modelLinks: state => state.modelLinks,
  attributesAll: state => state.attributesAll,
  valuesAll: state => state.valuesAll
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
        model: modelId
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
                'code': respV['id'],
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
                attList[attId]['values'].push({'code': valueID, 'russian_name': valuesList[valueID]['russian_name']})
              } else {
                attList[attId] = {
                  'code': respA['id'],
                  'is_open': respA['is_open'],
                  'french_name': respA['french_name'],
                  'english_name': respA['english_name'],
                  'russian_name': respA['russian_name'],
                  'values': !respA['is_open'] ? [{'code': valueID, 'russian_name': valuesList[valueID]['russian_name']}] : []
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
    vuexContext.commit('setValuesAll', valuesList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
