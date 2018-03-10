
// initial state
const state = {
  attributes: [],
  productsSelected: [],
  fieldsProd: [
    {key: 'Код продукта', label: 'Код продукта', sortable: true},
    {key: 'ATT_12963 - Название на сайте', label: 'Название на сайте', sortable: true},
    {key: 'Дата AVS', label: 'Дата AVS', sortable: true}
  ]
}

// mutations
const mutations = {
  setAttributes (state, attributes) {
    state.attributes = attributes
  },
  setProductsSelected (state, productsSelected) {
    state.productsSelected = productsSelected
  },
  setFieldsProd (state, fieldsProd) {
    state.fieldsProd = fieldsProd
  }
}

// getters
const getters = {
  attributes: state => state.attributes,
  productsSelected: state => state.productsSelected,
  fieldsProd: state => state.fieldsProd
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
          key === 'ATT_12963 - Название на сайте' ||
          key === 'ATT_01022 - Описание' ||
          key === 'Дата AVS' ||
          key === 'ATT_logistic-grossWeight - Вес, кг' ||
          key === 'ATT_12963 - Название на сайте' ||
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
      let NZ = totalQty - qty

      valuesList.push(['Не заполнено', NZ])
      attributesList.push({name: key, qty: qty, values: valuesList, percentage: percentage})
    }
    vuexContext.commit('setAttributes', attributesList)
  },
  setProductsSelected (vuexContext, productsSelected) {
    vuexContext.commit('setProductsSelected', productsSelected)
  },
  setFieldsProd (vuexContext, fieldsProd) {
    vuexContext.commit('setFieldsProd', fieldsProd)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
