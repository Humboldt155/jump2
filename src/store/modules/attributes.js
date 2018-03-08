
// initial state
const state = {
  attributes: []
}

// mutations
const mutations = {
  setAttributes (state, attributes) {
    state.attributes = attributes
  }
}

// getters
const getters = {
  attributes: state => state.attributes
}

// actions
const actions = {
  setAttributes (vuexContext, products) {
    let attributes = {}

    let totalQty = products.length

    for (let i = 0; i < totalQty; i++) {
      for (let key in products[i]) {
        if (key === '_cellVariants' ||
          key === '_showDetails' ||
          key === 'Код продукта' ||
          key === 'Отдел') continue
        if (products[i][key] === '') continue
        if (key in attributes) {
          attributes[key] += 1
        } else {
          attributes[key] = 1
        }
      }
    }
    let attributesList = []
    for (let key in attributes) {
      let qty = attributes[key]
      let percentage = Math.round(qty / totalQty * 100)
      attributesList.push({name: key, qty: qty, percentage: percentage})
    }
    vuexContext.commit('setAttributes', attributesList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
