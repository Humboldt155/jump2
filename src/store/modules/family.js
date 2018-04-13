import axios from 'axios'

// initial state
const state = {
  families: []
}

// mutations
const mutations = {
  setFamilies (state, families) {
    state.families = families
  }
}

// getters
const getters = {
  families: state => state.families
}

// actions
const actions = {
  setFamilies (vuexContext) {
    let families = []
    for (let iter = 0; iter < 2; iter++) {
      axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/families?pageSize=500&startFrom='.concat((1 + iter * 500).toString()), {
        headers: {
          'Authorization': 'Basic d2lrZW86b2VraXc'
        }
      })
        .then(response => {
          const resp = response.data.content
          // console.log(resp)
          for (let i = 0; i < resp.length; i++) {
            families.push({value: resp[i]['correlationId'], text: resp[i]['attribute'][0]['value'][0]})
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
    console.log(families.length)
    vuexContext.commit('setFamilies', families)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
