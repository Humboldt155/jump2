import axios from 'axios'
import * as https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false
})

const firstCols = ['Код продукта', 'ATT_12963 - Название на сайте', 'Выгружается на сайт', 'ATT_01022 - Описание']

const attCodeSlice = '/foundation/v2/attributes/'.length

const urlWithAVS = ''
const urlWithoutAVS = '%20AND%20NOT%20@(lifeCycle-AVSDate@PimStd):*'

const reqQty = 50

// initial state
const state = {
  modelOpus: {},
  products: [],
  columns: [],
  fields: [],
  productsTest: '',
  productsQty: {total: 0, description: 0, noDescriptionAvs: 0},
  totalCount: 0,
  isLoaded: false,
  isLoadAvs: false
}

// mutations
const mutations = {
  setProducts (state, products) {
    state.products = products
    // Вставляем пустые значения по тем артикулам, которые не заполнен
  },
  setIsLoadAvs (state, bool) {
    state.isLoadAvs = bool
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
  setProductsQty (state, productsQty) {
    state.productsQty = productsQty
  },
  setIsLoaded (state, bool) {
    state.isLoaded = bool
  }
}

// getters
const getters = {
  products: state => state.products,
  columns: state => state.columns,
  fields: state => state.fields,
  productsQty: state => state.productsQty,
  totalCount: state => state.totalCount,
  isLoaded: state => state.isLoaded,
  isLoadAvs: state => state.isLoadAvs
}

// actions
const actions = {
  setProducts (vuexContext, modelId) {
    let urlAVS = vuexContext.getters.isLoadAvs ? urlWithAVS : urlWithoutAVS
    vuexContext.commit('setTotalCount', -1)
    let productsNew = []
    let columns = {
      'Код продукта': 'Код продукта',
      'ATT_12963 - Название на сайте': 'ATT_12963 - Название на сайте',
      'Выгружается на сайт': 'Выгружается на сайт',
      'ATT_01022 - Описание': 'ATT_01022 - Описание'
    }
    let fields = [
      {key: 'Код продукта', label: 'Код продукта', sortable: true},
      {key: 'ATT_12963 - Название на сайте', label: 'Название на сайте ________________________________________________', sortable: true},
      {key: 'Выгружается на сайт', label: 'Выгружается на сайт', sortable: true},
      'ATT_01022 - Описание'
    ]
    let pQ = {total: 0, avs: 0, description: 0, noDescriptionAvs: 0}
    let att = new Set() // Набор всех возможных аттрибутов
    let totalCount = -1
    axios.get('https://wikeo:oekiw@webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize=' +
      '1&startFrom=1&filter=modelCode%3A'
        .concat(modelId, urlAVS, '&expand=attributes'), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        httpsAgent: agent
      }
    })
      .then(response => {
        vuexContext.commit('setTotalCount', response.data.totalCount)
      })
      .catch(e => {
        this.errors.push(e)
      })

    for (let req = 0; req < 150; req++) {
      if (totalCount === pQ.total) break
      axios.get('https://wikeo:oekiw@webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize='
        .concat(reqQty, '&startFrom=', 1 + req * reqQty, '&filter=modelCode%3A'
          .concat(modelId, urlAVS, '&mode=mask&mask=Jump,Characteristics&expand=attributes')), {
        headers: {
          'Authorization': 'Basic d2lrZW86b2VraXc',
          httpsAgent: agent
        }
      })
        .then(response => {
          const resp = response.data.content

          // Проходим циклом через все продукты, которые получили из БД Опуса
          for (let i = 0; i < resp.length; i++) {
            // Создаем объект, в котором будем хранить аттрибуты и значения выбранного продукта
            let product = {}
            pQ['total'] += 1 // + Товаров Всего

            // Лист всех атрибутов выбранного продукта
            let attributes = resp[i].chapter[0].attribute.concat(resp[i].chapter[1].attribute)

            attributes = attributes.filter(function (el) {
              let end = el.href.slice(attCodeSlice).split('@')[1]
              return el.href.slice(attCodeSlice).split('@')[0] !== 'sourceCountryCode' &&
                el.href.slice(attCodeSlice).split('@')[0] !== '6' &&
                end !== 'PimFeat/contexts/lang/en' &&
                end !== 'PimFeat/contexts/lang/ru' &&
                end !== 'PimFeat/contexts/lang/kk'
            })

            for (let j = 0; j < attributes.length; j++) {
              let attName = attributes[j].displayName

              // Вырезаем код атрибута из параметра href
              let attCode = 'ATT_'.concat(attributes[j].href.slice(attCodeSlice)).split('@')[0]
              let attConcat = attCode.concat(' - ', attName)

              if (attCode === 'ATT_productID') attConcat = 'Код продукта'
              if (attCode === 'ATT_12963') attConcat = 'ATT_12963 - Название на сайте'
              if (attCode === 'ATT_01022') {
                attConcat = 'ATT_01022 - Описание'
                pQ['description'] += 1
              }
              if (attCode === 'ATT_searchable') attConcat = 'Выгружается на сайт'
              if (attCode === 'ATT_6') {
                attConcat = 'Дата AVS'
                pQ['avs'] += 1
              }

              let attValue = attributes[j].value[0]
              if (Number(attValue) === attValue && attValue % 1 !== 0) {
                attValue = attValue.toString().replace('.', ',')
              }
              if (attCode === 'ATT_searchable') {
                attValue = ((attValue === true) ? 'да' : 'нет')
              }
              product[attConcat] = attValue
              att.add(attConcat)
            }
            productsNew.push(product)

            for (let i = 0; i < productsNew.length; i++) {
              // Заполняем данные по количествам
              for (let key of att) {
                if (!(key in productsNew[i])) {
                  if (key === 'ATT_01022 - Описание') {
                    productsNew[i][key] = ''
                    productsNew[i]['_cellVariants'] = {'ATT_01022 - Описание': 'secondary'}
                  } else {
                    productsNew[i][key] = ''
                  }
                }
              }
            }
          }
          for (let key of att) {
            if (!(firstCols.includes(key))) {
              columns[key] = key
              let newObj = {
                key: key,
                label: key.concat(' __________________________________________'),
                sortable: true
              }
              fields.push(newObj)
            }
          }
        })
        .catch(e2 => {
          this.errors.push(e2)
        })
      // if (totalCount === pQ.total) break
    }
    vuexContext.commit('setIsLoaded', !(totalCount === pQ.total))
    vuexContext.commit('setColumns', columns)
    vuexContext.commit('setFields', fields)
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
