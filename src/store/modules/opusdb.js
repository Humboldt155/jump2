
// initial state
import axios from 'axios/index'

const attCodeSlice = '/foundation/v2/attributes/'.length

const state = {
  opusdb: [],
  opusTotal: 0,
  opusCurrent: 0
}

// mutations
const mutations = {
  setOpusdb (state, opusdb) {
    state.opusdb = opusdb
  },
  setOpusTotal (state, opusTotal) {
    state.opusTotal = opusTotal
  },
  setOpusCurrent (state, opusCurrent) {
    state.opusCurrent = opusCurrent
  }
}

// getters
const getters = {
  opusdb: state => state.opusdb,
  opusTotal: state => state.opusTotal,
  opusCurrent: state => state.opusCurrent
}

// actions
const actions = {
  setOpusdb (vuexContext) {
    let opusdb = []
    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize='
      .concat(100, '&startFrom=', 1 + (0 * 50), '&mode=mask&mask=Characteristics&expand=attributes'), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        'X-Opus-Publish-Status': 'published'
      }
    })
      .then(response => {
        const resp = response.data.content
        // vuexContext.commit('setOpusdb', resp)
        for (let i = 0; i < resp.length; i++) {
          // vuexContext.commit('setOpusdb', resp[i])
          let attributes = resp[i].chapter[0].attribute
          attributes = attributes.filter(function (el) {
            let end = el.href.slice(attCodeSlice).split('@')[1]
            return el.href.slice(attCodeSlice).split('@')[0] !== 'sourceCountryCode' &&
                el.href.slice(attCodeSlice).split('@')[0] !== '01022' &&
                el.href.slice(attCodeSlice).split('@')[0] !== 'productID' &&
                end !== 'PimFeat/contexts/lang/en' &&
                end !== 'PimFeat/contexts/lang/ru' &&
                end !== 'PimFeat/contexts/lang/kk'
          })

          let model = 'MOD_'.concat(resp[i].model.code)
          let ID = resp[i].correlationId

          for (let j = 0; j < attributes.length; j++) {
            let attName = attributes[j].displayName
            let attValue = attributes[j].value[0]

            // Вырезаем код атрибута из параметра href
            let attCode = 'ATT_'.concat(attributes[j].href.slice(attCodeSlice)).split('@')[0]

            let row = {code: ID, model: model, attCode: attCode, attName: attName, value: attValue}

            opusdb.push(row)
          }
        }
        vuexContext.commit('setOpusdb', opusdb)
      })
      .catch(e => {
        this.errors.push(e)
      })
    // vuexContext.commit('setOpusdb', opusdb)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
