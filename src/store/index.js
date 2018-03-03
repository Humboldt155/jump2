import Vue from 'vue'
import Vuex from 'vuex'
import modelAdeo from './modules/model-adeo'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modelAdeo
  }
})
