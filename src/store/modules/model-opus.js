import axios from 'axios'

const excludeAtt = [
  'Current national selling price has a promotion',
  'Язык упаковки',
  'Код ОКПД',
  'International ID',
  'Тип поставщика',
  'Source country code',
  'Тип AEE:',
  'На какой склад?',
  'Название',
  'Модель продукта',
  'Срок действия серт. пожарн. безоп. (до)',
  'Производство Европейский Союз',
  'Unit capacity',
  'Current national selling price, taking into account the national promotions, including VAT',
  'Current standard national selling price (not taking into account the promotions), including VAT',
  'Current standard store selling price (not taking into account the promotions), including VAT',
  'Current store selling price has a promotion',
  'Current store selling price, taking into account the store promotions, including VAT',
  'Administrative label',
  'Available for sale stock',
  'Base VAT code of the product for a specific store',
  'Category ID of the management nomenclature',
  'Customer short label',
  'Date when the product status will be change to "to be removed"',
  'Date when the storage of the product in warehouse is stopped',
  'Department ID of the management nomenclature',
  'Enabled GTIN values',
  'GTIN links',
  'IS eligible for web publication?',
  'Is a LM store brand ?',
  'Is a store brand ?',
  'Is new ?',
  'Is ranged product ?',
  'Last store stock update date',
  'Last update date',
  'Letter range (Gamme)',
  'Link to the base VAT code of the product',
  'Link to the selling prices currency',
  'Logistic depth',
  'Logistic height',
  'Logistic net weight',
  'Номер модели',
  'Logistic width',
  'Management maturity level',
  'Maturity level quality',
  'Next standard national selling price (not taking into account the promotions), including VAT',
  'Next standard store selling price (not taking into account the promotions), including VAT',
  'Price repartition per quartile',
  'Product status',
  'Product typology',
  'Publication maturity level',
  'Re-stocking',
  'Re-stocking recommendation',
  'Sale status for the product',
  'Selling prices currency',
  'Start date of the next standard national selling price (not taking into account the promotions)',
  'Start date of the next standard store selling price (not taking into account the promotions)',
  'Sub-category ID of the management nomenclature',
  'Sub-department ID of the management nomenclature',
  'Substitution Products',
  'Unit sale (for consumer)',
  'Web publishing real status coming from publishing system',
  'Квартиль',
  'Классификация',
  'Короткое наименование товара для клиента',
  'Международ. Клас 1',
  'Модель Адео',
  'Область распространения',
  'Поток',
  'Стоп-Заказ',
  'Тип гаммы',
  'Ценник',
  'Центральный сток',
  'Additional links to accessory products',
  'Additional links to consumables',
  'Additional links to customer purchases',
  'Additional links to implementations',
  'Additional links to maintenance',
  'Additional links to services',
  'Additional links to tools',
  'Amount of discount on the unit price, including VAT for the next (or current) store promotion',
  'Capacity quantity',
  'Current store selling price alternative capacity unit code',
  'Current store selling price, expressed by alternative capacity unit',
  'Distribution region',
  'End date of the next (or current) store promotion',
  'Flash sale category',
  'Gap code of the next (or current) store promotion',
  'Identifier of the commercial operation (OPECOM) linked to the next (or current) store promotion',
  'Is 20/80 ?',
  'Is part of composition ?',
  'Links from product to samples',
  'New unit price (including VAT) for the next (or current) store promotion',
  'Percentage of discount of the next (or current) store promotion',
  'Price category',
  'Publication maturity level',
  'Complementary products (cross sell)',
  'Image',
  'Searchable',
  'Visible',
  'Срок действия санит. епидем. (до)',
  'Срок действия сертиф. соотв.(до)',
  '№ Санитарно епидемиологич. заключение',
  '№ Сертификат пожарной безопасности',
  '№ Сертификата соответствия',
  'LAD Category',
  'Is editable selling price by store?',
  'Is the product removed ?',
  'ADR Risk classification',
  'Expiration date category',
  'Number of package (if multi package product)',
  'Specific transport family',
  'Start date of the next (or current) store promotion',
  'Type of discount for the next (or current) store promotion',
  'Comment for order lock reason',
  'Order lock reason',
  'Sale lock reason',
  'Link from product to sample',
  'Store stock recommendation'
]

const firstCols = ['Код продукта', 'Название на сайте', 'Отдел', 'Дата AVS', 'Описание']

const att_code_slice = '/foundation/v2/attributes/'.length

// initial state
const state = {
  modelOpus: {},
  products: [],
  columns: [],
  fields: [],
  productsTest: [],
  attributes: [],
  productsQty: {},
  isLoaded: false
}

// mutations
const mutations = {
  setModelOpus (state, modelOpus) {
    state.modelOpus = modelOpus
  },
  setProducts (state, products) {
    state.products = products
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
  isLoaded: state => state.isLoaded
}

// actions
const actions = {
  setModelOpus (vuexContext, modelId) {
    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/foundation/v2/modelTypes/Product/models/'.concat(modelId), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        'X-Opus-Publish-Status': 'published'
      }
    })
      .then(response => {
        vuexContext.commit('setModelOpus', response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  setProducts (vuexContext, modelId) {
    vuexContext.commit('setIsLoaded', true)
    axios.get('https://webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize=500&startFrom=1&filter=modelCode%3A'
      .concat(modelId, '&expand=attributes&context=lang%3Aru'), {
      headers: {
        'Authorization': 'Basic d2lrZW86b2VraXc',
        'X-Opus-Publish-Status': 'published'
      }
    })
      .then(response => {
        const resp = response.data.content
        // Финальный лист всех продуктов в формате {key: value}
        let productsNew = []

        // Временный сет, в котором будем хранить все возможные значения атрибутов
        let att = new Set()

        // Проходим циклом через все продукты, которые получили из БД Опуса
        for (let i = 0; i < resp.length; i++) {
          // Создаем объект, в котором будем хранить аттрибуты и значения выбранного продукта
          let product = {}

          // Лист всех атрибутов выбранного продукта
          let attributes = resp[i].attribute

          for (let j = 0; j < attributes.length; j++) {
            let attName = attributes[j].displayName
            console.log(attributes[j].displayName)
            // Пропускаем все атрибуты, находящиеся в списке 'excludeAtt'
            if (excludeAtt.includes(attName)) { continue }

            // Вырезаем код атрибута из параметра href
            let attCode = 'ATT_'.concat(attributes[j].href.slice(att_code_slice)).split('@')[0]
            if (attCode === 'ATT_maturityLevelPublication') { continue }
            if (attCode === 'ATT_marketingDescription') { continue }
            let attConcat = attCode.concat(' - ', attName)

            if (attCode === 'ATT_logistic-grossWeight') { attConcat = 'Вес, кг' }
            if (attCode === 'ATT_productID') { attConcat = 'Код продукта' }
            if (attCode === 'ATT_3') { attConcat = 'Отдел' }
            if (attCode === 'ATT_6') { attConcat = 'Дата AVS' }
            if (attCode === 'ATT_12963') { attConcat = 'Название на сайте' }
            if (attCode === 'ATT_marketingDescription') { attConcat = 'Описание' }
            if (attCode === 'ATT_01022') { attConcat = 'Описание' }

            let attValue = attributes[j].value[0]
            product[attConcat] = attValue
            att.add(attConcat)
          }
          productsNew.push(product)
        }
        let pQ = {total: 0, avs: 0, description: 0, noDescriptionAvs: 0}
        // Вставляем пустые значения по тем артикулам, которые не заполнены
        for (let i = 0; i < productsNew.length; i++) {
          // Заполняем данные по количествам
          pQ['total'] += 1 // + Товар Всего
          let product = productsNew[i]
          for (let key of att) {
            if ((key in product)) {
              if (key === 'Описание') { pQ['description'] += 1 }
            }
            if (!(key in product)) {
              if (key === 'Описание') {
                productsNew[i][key] = 'Нет описания'
              } else if (key === 'Дата AVS') {
                pQ['avs'] += 1 // + Товар без avs
              } else {
                productsNew[i][key] = ''
              }
            }
          }
        }
        let columns = {
          'Код продукта': 'Код продукта',
          'Название на сайте': 'Название на сайте',
          'Отдел': 'Отдел',
          'Дата AVS': 'Дата AVS',
          'Описание': 'Описание'
        }
        let fields = [
          {
            key: 'Код продукта',
            label: 'Код продукта',
            sortable: true
          },
          {
            key: 'Название на сайте',
            label: 'Название на сайте ________________________________________________',
            sortable: true
          },
          {
            key: 'Отдел',
            label: 'Отдел',
            sortable: true
          },
          {
            key: 'Дата AVS',
            label: 'Дата AVS',
            sortable: true
          },
          'Описание'
        ]
        for (let key of att) {
          if (!(firstCols.includes(key))) {
            columns[key] = key
            fields.push({
              key: key,
              label: key.concat(' __________________________________'),
              sortable: true
            })
          }
        }

        vuexContext.commit('setColumns', columns)
        vuexContext.commit('setFields', fields)
        vuexContext.commit('setProducts', productsNew)
        vuexContext.commit('setProductsQty', pQ)
        vuexContext.commit('setIsLoaded', false)
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
