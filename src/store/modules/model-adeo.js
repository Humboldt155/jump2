import axios from 'axios'

// initial state
const state = {
  modelId: '',
  modelAdeo: {}
}

// mutations
const mutations = {
  setModelId (state, modelId) {
    state.modelId = modelId
  },
  setModelAdeo (state, modelAdeo) {
    state.modelAdeo = modelAdeo
  }
}

// getters
const getters = {
  modelId: state => state.modelId,
  modelAdeo: state => state.modelAdeo
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
