import axios from 'axios'

// initial state
const state = {
  modelId: '',
  modelAdeo: {'model_group_adeo': ''},
  allModels: [],
  modelGroup: {},
  fileName: '',
  modelGroups: {},
  modelsList: {id: '', list: []},
  subDepartment: {}

}

// mutations
const mutations = {
  setModelId (state, modelId) {
    state.modelId = modelId
  },
  setModelAdeo (state, modelAdeo) {
    state.modelAdeo = modelAdeo
  },
  setAllModels (state, allModels) {
    state.allModels = allModels
  },
  setModelsList (state, modelsList) {
    state.modelsList = modelsList
  },
  setFileName (state, fileName) {
    state.fileName = fileName
  }
}

// getters
const getters = {
  modelId: state => state.modelId,
  modelAdeo: state => state.modelAdeo,
  allModels: state => state.allModels,
  modelsList: state => state.modelsList,
  fileName: state => state.fileName
}

// actions
const actions = {
  setModelId (vuexContext, modelId) {
    vuexContext.commit('setModelId', modelId)
  },
  setModelAdeo (vuexContext, modelId) {
    // Получаем модель по номеру модели
    axios.get('http://humboldt155.pythonanywhere.com/api/models/', {
      params: {
        id: 'MOD_'.concat(modelId)
      }
    })
      .then(response => {
        // Получаем все данные о текущей модели
        vuexContext.commit('setModelAdeo', response.data[0])
        vuexContext.commit('setFileName', response.data[0]['russian_name'].concat('.xls'))

        // Получаем код группы моделей
        const modelGroupId = response.data[0].model_group_adeo

        const subDepaptmentId = 'SSRAY_'.concat(modelGroupId.slice(4, 10))

        // В этой переменной будем хранить всю инфомрацию о текущем подотделе
        let subDepartment = {}
        let modelsList = {id: '', list: []}
        // Получить группу, в которой находится текущая модель
        axios.get('http://humboldt155.pythonanywhere.com/api/sub_departments_adeo/', {
          params: {
            id: subDepaptmentId
          }
        })
          .then(response => {
            subDepartment = response.data[0]
            modelsList.id = subDepartment.name
          })
          .catch(e => {
            this.errors.push(e)
          })

          // Получить все группы, входящие в подотдел
        let modelGroups = []
        axios.get('http://humboldt155.pythonanywhere.com/api/model_groups_adeo/', {
          params: {
            sub_department_adeo: subDepaptmentId
          }
        })
          .then(response => {
            modelGroups = response.data
            for (let i = 0; i < modelGroups.length; i++) {
              let mgName = modelGroups[i].name
              let mgId = modelGroups[i].id
              let models = []
              axios.get('http://humboldt155.pythonanywhere.com/api/models/', {
                params: {
                  model_group_adeo: mgId
                }
              })
                .then(response => {
                  models = response.data
                  modelsList.list.push({id: mgName, list: models})
                })
                .catch(e => {
                  this.errors.push(e)
                })
            }
            vuexContext.commit('setModelsList', modelsList)
          })
          .catch(e => {
            this.errors.push(e)
          })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  setAllModels (vuexContext) {
    axios.get('http://humboldt155.pythonanywhere.com/api/models/')
      .then(response => {
        vuexContext.commit('setAllModels', response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  setModelGroupId (vuexContext, closeModels) {
    vuexContext.commit('setCloseModels', closeModels)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
