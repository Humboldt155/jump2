import axios from 'axios'
import https from 'https'

const firstCols = ['Код продукта', 'ATT_12963 - Название на сайте', 'Отдел', 'Дата AVS', 'ATT_01022 - Описание']

const attCodeSlice = '/foundation/v2/attributes/'.length

const reqQty = 50

// initial state
const state = {
  modelOpus: {},
  products: [],
  columns: [],
  fields: [],
  productsTest: '',
  attributes: [],
  productsQty: {},
  totalCount: 0,
  isLoaded: false
}

// mutations
const mutations = {
  setModelOpus (state, modelOpus) {
    state.modelOpus = modelOpus
  },
  setProducts (state, products) {
    state.products = products
    // Вставляем пустые значения по тем артикулам, которые не заполнен
  },
  setTotalCount (state, totalCount) {
    state.totalCount = totalCount
    // Вставляем пустые значения по тем артикулам, которые не заполнен
  },
  setColumns (state, columns) {
    state.columns = columns
  },
  setFields (state, fields) {
    state.fields = fields
  },
  setProductsTest (state, productsTest) {
    state.productsTest = productsTest
  },
  setAttributes (state, attributes) {
    state.attributes = attributes
  },
  setProductsQty (state, productsQty) {
    state.productsQty = productsQty
  },
  setIsLoaded (state, bool) {
    state.isLoaded = bool
  }
}

// getters
const getters = {
  modelOpus: state => state.modelOpus,
  products: state => state.products,
  columns: state => state.columns,
  fields: state => state.fields,
  productsTest: state => state.productsTest,
  attributes: state => state.attributes,
  productsQty: state => state.productsQty,
  totalCount: state => state.totalCount,
  isLoaded: state => state.isLoaded
}

// actions
const actions = {
  setModelOpus (vuexContext, modelId) {
    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/foundation/v2/modelTypes/Product/models/'.concat(modelId), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        'X-Opus-Publish-Status': 'published'
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
      .then(response => {
        vuexContext.commit('setModelOpus', response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  setProducts (vuexContext, modelId) {
    let productsNew = []
    let columns = {
      'Код продукта': 'Код продукта',
      'ATT_12963 - Название на сайте': 'ATT_12963 - Название на сайте',
      'Отдел': 'Отдел',
      'Дата AVS': 'Дата AVS',
      'ATT_01022 - Описание': 'ATT_01022 - Описание'
    }
    // let fields = [
    //   {key: 'Код продукта', label: 'Код продукта', sortable: true},
    //   {key: 'ATT_12963 - Название на сайте', label: 'Название на сайте ________________________________________________', sortable: true},
    //   {key: 'Отдел', label: 'Отдел', sortable: true},
    //   {key: 'Дата AVS', label: 'Дата AVS', sortable: true},
    //   'ATT_01022 - Описание'
    // ]
    let pQ = {total: 0, avs: 0, description: 0, noDescriptionAvs: 0}
    let att = new Set() // Набор всех возможных аттрибутов

    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize=1&startFrom=1&filter=modelCode%3A'
      .concat(modelId, '&expand=attributes&context=lang%3Aru'), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        'X-Opus-Publish-Status': 'published'
      }
    })
      .then(response => {
        const totalCount = response.data.totalCount
        vuexContext.commit('setTotalCount', totalCount)
      })
      .catch(e => {
        this.errors.push(e)
      })

    for (let req = 0; req < 300; req++) {
      axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize='
        .concat(reqQty, '&startFrom=', 1 + req * reqQty, '&filter=modelCode%3A', modelId, '&expand=attributes&context=lang%3Aru'), {
        headers: {
          'Authorization': 'Basic d2lrZW86b2VraXc',
          'X-Opus-Publish-Status': 'published'
        }
      })
        .then(response => {
          const resp = response.data.content
          const totalCount = response.data.totalCount
          vuexContext.commit('setTotalCount', totalCount)

          // Временный сет, в котором будем хранить все возможные значения атрибутов

          // Проходим циклом через все продукты, которые получили из БД Опуса
          for (let i = 0; i < resp.length; i++) {
            // Создаем объект, в котором будем хранить аттрибуты и значения выбранного продукта
            let product = {}

            if (resp.length === 0) {
              break
            } else {
              pQ['total'] += 1 // + Товар Всего
            }

            // Лист всех атрибутов выбранного продукта
            let attributes = resp[i].attribute.filter(function (attribute) {
              let code = attribute.href.slice(attCodeSlice).split('@')[0]
              let check = (code.length === 5 || code === 'productID' || code === '3' || code === '6') && (code !== 'isMDD') && (code !== 'isNew')
              return check
            })

            for (let j = 0; j < attributes.length; j++) {
              let attName = attributes[j].displayName

              // Вырезаем код атрибута из параметра href
              let attCode = 'ATT_'.concat(attributes[j].href.slice(attCodeSlice)).split('@')[0]
              let attConcat = attCode.concat(' - ', attName)

              if (attCode === 'ATT_productID') {
                attConcat = 'Код продукта'
              }
              if (attCode === 'ATT_12963') {
                attConcat = 'ATT_12963 - Название на сайте'
              }
              if (attCode === 'ATT_01022') {
                attConcat = 'ATT_01022 - Описание'
                pQ['description'] += 1
              }
              if (attCode === 'ATT_3') {
                attConcat = 'Отдел'
              }
              if (attCode === 'ATT_6') {
                attConcat = 'Дата AVS'
                pQ['avs'] += 1
              }

              let attValue = attributes[j].value[0]
              product[attConcat] = attValue
              att.add(attConcat)
            }
            productsNew.push(product)

            for (let i = 0; i < productsNew.length; i++) {
              // Заполняем данные по количествам
              let product = productsNew[i]
              for (let key of att) {
                if (!(key in product)) {
                  if (key === 'ATT_01022 - Описание') {
                    productsNew[i][key] = 'Нет описания'
                  } else {
                    productsNew[i][key] = ''
                  }
                }
              }
            }
            for (let key of att) {
              if (!(firstCols.includes(key))) {
                columns[key] = key
                // let newObj = {
                //   key: key,
                //   label: key.concat(' __________________________________'),
                //   sortable: true
                // }
                // fields.push(newObj)
              }
            }
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
    vuexContext.commit('setColumns', columns)
    // vuexContext.commit('setFields', fields)
    vuexContext.commit('setProducts', productsNew)
    vuexContext.commit('setProductsQty', pQ)
  },
  setFields (vuexContext, fields) {
    vuexContext.commit('setFields', fields)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
