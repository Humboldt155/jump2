import axios from 'axios'

// initial state
const state = {
  families: ''
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
    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/families?pageSize=500&startFrom=1', {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc'
      }
    })
      .then(response => {
        const resp = response.data.content
        // console.log(resp)
        for (let i = 0; i < resp.length; i++) {
          families.push(resp[i]['correlationId'])
        }
      })
      .catch(e2 => {
        this.errors.push(e2)
      })
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
