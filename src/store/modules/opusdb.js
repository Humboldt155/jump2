import axios from 'axios'
import * as https from 'https'


// Перечень кодов атрибутов, которые не нужны для выборки (Описание, Вес, и др.)
const excludeAttributes = [
  'sourceCountryCode',
  '01022',
  '06575',
  '00124',
  'logistic-grossWeight',
  '01305'
]

const agent = new https.Agent({
  rejectUnauthorized: false
})

// Перечень меток атрибутов на других языках, которые не нужны для выборки
const excludeLang = [
  'PimFeat/contexts/lang/en',
  'PimFeat/contexts/lang/ru',
  'PimFeat/contexts/lang/kk'
]

// Код атрибута указан в ключе 'href' в формате '/foundation/v2/attributes/CODE@PimFeat'
// для получения кода, понадобится вырезать из данной строки. Получаем количества знаков, после которого
// идет код атрибута
const attCodeSlice = '/foundation/v2/attributes/'.length

// Количество артикулов, которое получаем за один запрос
const productsPerCycle = 35

// Количество циклов (исходя из того, что в Опус менее 200 000 артикулов
const requestsQty = 100000 / productsPerCycle

const state = {
  // Глобальная переменная, в которой будем хранить конечные данные
  opusdb: [],
  opusCurrent: 0
}

// mutations
const mutations = {
  setOpusdb (state) {
    // Запускаем цикл запросов
    for (let req = 0; req < requestsQty; req++) {
      // Запрос в базу данных с помощью axios
      axios.get('https://wikeo:oekiw@webtopdata2.lmru.opus.adeo.com:5000/business/v2/products?pageSize='
        .concat(productsPerCycle, '&startFrom=', 1 + (req * productsPerCycle), '&mode=mask&mask=Characteristics&filter=NOT%20@(lifeCycle-AVSDate@PimStd):*&expand=attributes'), {
        headers: {
          'Authorization': 'Basic d2lrZW86b2VraXc',
          httpsAgent: agent
        }
      })
        .then(response => {
          // Получаем ответ по запросу (список артикулов)
          const resp = response.data.content

          // Добавляем в каунтер количество обработанных артикулов
          state.opusCurrent += resp.length

          // Проходим циклом по всем полученным артикулам
          for (let i = 0; i < resp.length; i++) {
            // Получаем список атрибутов по конкрентному атрибуту
            let attributes = resp[i].chapter[0].attribute

            // Запускаем фильтр, чтобы удалить из списка ненужные нам атрибуты
            attributes = attributes.filter(function (el) {
              // вырезаем из значения 'href' код атрибута
              let attributeCode = el.href.slice(attCodeSlice).split('@')[0]

              // вырезаем из значения 'href' код маркировку языка
              let langMark = el.href.slice(attCodeSlice).split('@')[1]

              // Применяем фильтр, чтобы исключить из списка ненужные атрибуты
              return !excludeAttributes.includes(attributeCode) &&
                !excludeLang.includes(langMark)
            })

            // Получаем номер модели
            let model = 'MOD_'.concat(resp[i].model.code)

            // получаем LMкод
            let ID = resp[i].correlationId

            // Запускаем цикл по всем атрибутам артикула
            for (let j = 0; j < attributes.length; j++) {
              // Получаем код и значение атрибута
              let attName = attributes[j].displayName
              let attValue = attributes[j].value[0]

              // Вырезаем код атрибута из параметра href
              let attCode = 'ATT_'.concat(attributes[j].href.slice(attCodeSlice)).split('@')[0]

              // Создаем список значений (одна строчка в конечном файле)
              let row = {code: ID, model: model, attCode: attCode, attName: attName, value: attValue}

              // Добавляем строку в глобальную переменную
              state.opusdb.push(row)
            }
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  setOpusCurrent (state, opusCurrent) {
    state.opusCurrent = opusCurrent
  }
}

// getters
const getters = {
  opusdb: state => state.opusdb,
  opusCurrent: state => state.opusCurrent
}

// actions
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
