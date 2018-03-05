import axios from 'axios'

// initial state
const state = {
  modelId: '',
  modelAdeo: {},
  modelGroupId: '',
  allModels: [],
  closeModels: [],
  nearModels: []
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
  setModelGroupId (state, modelGroupId) {
    state.modelGroupId = modelGroupId
  },
  setCloseModels (state, closeModels) {
    state.closeModels = closeModels
  },
  setNearModels (state, nearModels) {
    state.nearModels = nearModels
  }
}

// getters
const getters = {
  modelId: state => state.modelId,
  modelAdeo: state => state.modelAdeo,
  allModels: state => state.allModels,
  modelGroupId: state => state.modelGroupId,
  closeModels: state => state.closeModels,
  nearModels: state => state.nearModels
}

// actions
const actions = {
  setModelId (vuexContext, modelId) {
    vuexContext.commit('setModelId', modelId)
  },
  setModelAdeo (vuexContext, modelId) {
    axios.get('http://humboldt155.pythonanywhere.com/api/models/', {
      params: {
        id: 'MOD_'.concat(modelId)
      }
    })
      .then(response => {
        vuexContext.commit('setModelAdeo', response.data[0])
        const mg = response.data[0].model_group_adeo
        vuexContext.commit('setModelGroupId', mg)
        let closeModels = vuexContext.state.allModels.filter(function (model) {
          return model.model_group_adeo === mg
        })
        let nearModels = vuexContext.state.allModels.filter(function (model) {
          return model.model_group_adeo.slice(0, 10) === mg.slice(0, 10)
        })
        vuexContext.commit('setCloseModels', closeModels)
        vuexContext.commit('setNearModels', nearModels)
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
