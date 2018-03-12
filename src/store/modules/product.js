import axios from 'axios'

const attCodeSlice = '/foundation/v2/attributes/'.length

// initial state
const state = {
  productId: '',
  productAttributes: [],
  productModelId: '',
  productModel: []
}

// mutations
const mutations = {
  setProductId (state, productId) {
    state.productId = productId
  },
  setProductAttributes (state, productAttributes) {
    state.productAttributes = productAttributes
  },
  setProductModelId (state, productModelId) {
    state.productModelId = productModelId
  },
  setProductModel (state, productModel) {
    state.productModel = productModel
  }
}

// getters
const getters = {
  productId: state => state.productId,
  productAttributes: state => state.productAttributes,
  productModelId: state => state.productModelId,
  productModel: state => state.productModel
}

// actions
const actions = {
  setProductAttributes (vuexContext, productId) {
    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/products/'.concat(productId, '_PimStd_Product'), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        'X-Opus-Publish-Status': 'published'
      }
    })
      .then(response => {
        let productAttributes = []
        const resp = response.data

        axios.get('http://humboldt155.pythonanywhere.com/api/models/', {
          params: {
            id: 'MOD_'.concat(resp.model.code)
          }
        })
          .then(response => {
            // Получаем все данные о текущей модели
            vuexContext.commit('setProductModel', response.data[0])
          })
          .catch(e => {
            this.errors.push(e)
          })

        vuexContext.commit('setProductModelId', resp.model.code)
        let attributes = resp.attribute

        for (let j = 0; j < attributes.length; j++) {
          let attCode = attributes[j].href.slice(attCodeSlice).split('@')[0]
          if (attCode === '6') {
            attCode = 'Дата AVS'
          } else if (attCode === '12963') {
            attCode = 'Наименование товара'
          } else {
            continue
          }
          let attValue = attributes[j].value[0]
          productAttributes.push({code: attCode, value: attValue})
        }
        vuexContext.commit('setProductAttributes', productAttributes)
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
