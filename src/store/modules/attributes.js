
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
        const value = products[i][key]
        if (key === '_cellVariants' ||
          key === '_showDetails' ||
          key === 'Код продукта' ||
          key === 'Отдел') continue
        if (value === '') continue
        if (key in attributes) {
          attributes[key][0] += 1
        } else {
          attributes[key] = [1, {}]
        }
        if (key === 'ATT_12963 - Название на сайте' || key === 'ATT_01022 - Описание' || key === 'Дата AVS' || key === 'ДATT_logistic-grossWeight - Вес, кг') continue
        if (value in attributes[key][1]) {
          attributes[key][1][value] += 1
        } else {
          attributes[key][1][value] = 1
        }
      }
    }
    let attributesList = []
    for (let key in attributes) {
      let qty = attributes[key][0]
      let values = attributes[key][1]
      let percentage = Math.round(qty / totalQty * 100)
      let valuesList = []
      for (let key in values) {
        valuesList.push([key, values[key]])
      }
      attributesList.push({name: key, qty: qty, values: valuesList, percentage: percentage})
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
