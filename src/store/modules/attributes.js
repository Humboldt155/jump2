// initial state
const state = {
  attributes: [],
  productsSelected: [],
  fieldsProd: [
    {key: 'Код продукта', label: 'Код продукта', sortable: true},
    {key: 'ATT_12963 - Название на сайте', label: 'Название на сайте', sortable: true}
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
  setAttributes (vuexContext, products, attributesAll) {
    let totalQty = products.length

    for (let i = 0; i < totalQty; i++) {
      let product = products[i]
      for (let att in product) {
        if (product.hasOwnProperty(att)) {
          attributesAll[att].qty = attributesAll[att].qty + 1
        }
      }
    }
    vuexContext.commit('setAttributes', attributesAll)
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
