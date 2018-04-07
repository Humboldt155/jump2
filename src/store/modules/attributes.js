import axios from 'axios'
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
  },
  loadStep (state) {
    for (let i = 0; i < state.attributes.length; i++) {
      let code = state.attributes[i]['code']
      axios.get('http://humboldt155.pythonanywhere.com/api/attributes/', {
        params: {
          id: code
        }
      })
        .then(response => {
          state.attributes[i]['isOpen'] = response.data[0]['is_open'] ? 'открытый' : 'закрытый'
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
}

// getters
const getters = {
  attributes: state => state.attributes,
  productsSelected: state => state.productsSelected,
  fieldsProd: state => state.fieldsProd,
  test: state => state.test
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
          key === 'ATT_logistic-grossWeight - Вес, кг' ||
          key === 'Отдел') continue
        if (value === '') continue
        if (key in attributes) {
          attributes[key][0] += 1
        } else {
          attributes[key] = [1, {}]
        }
        if (key === 'ATT_12963 - Название на сайте' || key === 'ATT_01022 - Описание' || key === 'ДATT_logistic-grossWeight - Вес, кг') continue
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
      attributesList.push({code: key.slice(0, 9), isOpen: '', name: key.slice(12, key.length), qty: qty, values: valuesList, percentage: percentage})
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
