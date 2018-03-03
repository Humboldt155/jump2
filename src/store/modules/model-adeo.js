import axios from 'axios'

// initial state
const state = {
  modelId: '',
  modelAdeo: {},
  modelGroupId: '',
  allModels: []
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
  }
}

// getters
const getters = {
  modelId: state => state.modelId,
  modelAdeo: state => state.modelAdeo,
  allModels: state => state.allModels,
  modelGroupId: state => state.modelGroupId
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
        vuexContext.commit('setModelGroupId', response.data[0].model_group_adeo)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
