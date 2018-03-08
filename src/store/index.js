import Vue from 'vue'
import Vuex from 'vuex'
import modelAdeo from './modules/model-adeo'
import modelOpus from './modules/model-opus'
import attributes from './modules/attributes'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modelAdeo,
    modelOpus,
    attributes
  }
})
