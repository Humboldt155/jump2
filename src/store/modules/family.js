import axios from 'axios'
import * as https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false
})

const attCodeSlice = '/foundation/v2/attributes/'.length

// initial state
const state = {
  families: [],
  familyProducts: [],
  totalCountFamily: 0
}

// mutations
const mutations = {
  setFamilies (state, families) {
    state.families = families
  },
  setFamilyProducts (state, familyProducts) {
    state.familyProducts = familyProducts
  },
  seTotalCountFamily (state, totalCountFamily) {
    state.totalCountFamily = totalCountFamily
  }
}

// getters
const getters = {
  families: state => state.families,
  familyProducts: state => state.familyProducts,
  totalCountFamily: state => state.totalCountFamily
}

// actions
const actions = {
  setFamilyProducts (vuexContext, familyId) {
    // Устанавливаем значение общего количества равным -1
    // Это нужно для того, чтобы в случае, если значение будет равно 0,
    // То это точно количество товаров в списке, а не значение по умолчанию
    vuexContext.commit('seTotalCountFamily', -1)

    let att = new Set() // Набор всех возможных аттрибутов

    // Получаем общее количество товаров в семье
    axios.get('https://wikeo:oekiw@webtopdata.lmru.opus.adeo.com:5000/business/v2/' +
      'families/'.concat(familyId, '_Opus_Family/contentSet/contents'), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        httpsAgent: agent
      }
    })
      .then(response => {
        // Заносим полученный ответ в переменную
        vuexContext.commit('seTotalCountFamily', response.data.seTotalCountFamily)
      })
      .catch(e => {
        this.errors.push(e)
      })
    // Обращаемся циклом к списку товаров в модели
    let reqQty = 30
    let products = []
    for (let req = 0; req < 1; req++) {
      axios.get('https://wikeo:oekiw@webtopdata.lmru.opus.adeo.com:5000/business/v2/' +
      'families/'.concat(familyId, '_Opus_Family/contentSet/contents' +
        '?pageSize=10&startFrom=1&mode=mask&mask=Jump,Characteristics&expand=attributes'), {
        headers: {
          'Authorization': 'Basic d2lrZW86b2VraXc',
          httpsAgent: agent
        }
      })
        .then(response => {
          const resp = response.data.content
          for (let i = 0; i < resp.length; i++) {
            // Создаем объект, в котором будем хранить аттрибуты и значения выбранного продукта
            let product = {'id': resp[i]['correlationId']}

            // Лист всех атрибутов выбранного продукта
            let attributes = resp[i].chapter[0].attribute

            attributes = attributes.filter(function (el) {
              let end = el.href.slice(attCodeSlice).split('@')[1]
              return el.href.slice(attCodeSlice).split('@')[0] !== 'sourceCountryCode' &&
                el.href.slice(attCodeSlice).split('@')[0] !== '6' &&
                el.href.slice(attCodeSlice).split('@')[0] !== 'productID' &&
                end !== 'PimFeat/contexts/lang/en' &&
                end !== 'PimFeat/contexts/lang/ru' &&
                end !== 'PimFeat/contexts/lang/kk'
            })

            for (let j = 0; j < attributes.length; j++) {
              let attName = attributes[j].displayName

              // Вырезаем код атрибута из параметра href
              let attCode = 'ATT_'.concat(attributes[j].href.slice(attCodeSlice)).split('@')[0]
              let attConcat = attCode.concat(' - ', attName)

              if (attCode === 'ATT_12963') attConcat = 'ATT_12963 - Название на сайте'
              if (attCode === 'ATT_01022') {
                attConcat = 'ATT_01022 - Описание'
              }

              let attValue = attributes[j].value[0]
              if (Number(attValue) === attValue && attValue % 1 !== 0) {
                attValue = attValue.toString().replace('.', ',')
              }
              product[attConcat] = attValue
              att.add(attConcat)
            }
            products.push(product)
          }
        })
        .catch(e2 => {
          this.errors.push(e2)
        })
      vuexContext.commit('setFamilyProducts', products)

    }
  },
  setFamilies (vuexContext) {
    let families = []
    for (let iter = 0; iter < 2; iter++) {
      axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/families?pageSize=500&startFrom='.concat((1 + iter * 500).toString()), {
        headers: {
          'Authorization': 'Basic d2lrZW86b2VraXc',
          httpsAgent: agent
        }
      })
        .then(response => {
          const resp = response.data.content
          // console.log(resp)
          for (let i = 0; i < resp.length; i++) {
            families.push({value: resp[i]['correlationId'], text: resp[i]['attribute'][0]['value'][0]})
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
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
