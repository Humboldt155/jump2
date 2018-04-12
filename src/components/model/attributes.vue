<template>
  <b-container fluid>
    <p></p><br>
        <b-table
          sort-by="qty"
          :sort-desc="sortDesc"
          bordered
          responsive
          hover
          small
          caption-top
          :items="attributes"
          :fields="fieldsAtt"
        >
        <template slot="table-caption">
          <b-btn size="sm" variant="info" @click="onLoadAttributes">ПОКАЗАТЬ ВСЕ АТРИБУТЫ</b-btn>
        </template>
        <template slot="values" slot-scope="row">
          <b-button size="sm" @click.stop="row.toggleDetails" @click="onLoadValues(row.item.id)" class="mr-2" variant="outline-secondary">
            детали {{ row.detailsShowing ? '-' : '+'}}
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card tag="article" style="max-width: 60rem" class="mb-2">
            <b-container fluid>
              <b-row>
                <b-col>
                  <h5>{{ row.item.id }} - {{ row.item.russian_name }}</h5>
                  <p><b-badge variant="light">fra</b-badge> - {{ row.item.french_name }}<br>
                  <b-badge variant="light">eng</b-badge> - {{ row.item.english_name }}</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-btn v-b-toggle="'collapse2'" size="sm" @click="onLoadAttLinks(row.item.id)" class="mr-2" variant="outline-info">показать связи</b-btn>
                    <b-collapse id="collapse2">
                      <b-card v-if="currentAtt !== row.item.id"></b-card>
                      <b-card v-else>
                        <h4>Список моделей, в которых встречается атрибут {{ row.item.id }}</h4>
                        <p><b-badge variant="warning">ограничение на загрузку - 100 штук</b-badge></p>
                        <b-btn size="sm" @click="setLinksNames" variant="outline-info">загрузить наименования</b-btn>
                        <b-table
                          bordered
                          responsive
                          hover
                          small
                          :items="attributeLinks"
                          :fields="fieldsLinks"
                        ></b-table>
                      </b-card>
                    </b-collapse>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-table
                    sort-by="qty"
                    :sort-desc="sortDesc"
                    bordered
                    responsive
                    hover
                    small
                    caption-top
                    :items="row.item.values"
                    :fields="fieldsVal"
                  >
                    <template slot="products">
                      <b-button size="sm" @click="setSelectedProducts(row.item.id.values)" class="mr-2" variant="outline-secondary">
                        список
                      </b-button>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: 'attributes',
  data () {
    return {
      sortDesc: true,
      currentAtt: '',
      fieldsAtt: [
        {key: 'id', label: 'Код атрибута', sortable: true},
        {key: 'russian_name', label: 'Наименование атрибута', sortable: true},
        {key: 'qty', label: 'Заполнено, шт.', sortable: true},
        {key: 'percentage', label: 'Заполнено, %', sortable: true},
        {key: 'values', label: 'Значения'},
        {key: 'is_open', label: 'Тип', sortable: true}
      ],
      fieldsVal: [
        {key: 'id', label: 'Код', sortable: true},
        {key: 'russian_name', label: 'Значение', sortable: true},
        {key: 'qty', label: 'Артикулы(шт)', sortable: true},
        {key: 'products', label: 'Список'}
      ],
      fieldsLinks: [
        {key: 'dep', label: 'Dep', sortable: true},
        {key: 'model', label: 'Код модели', sortable: true},
        {key: 'name', label: 'Значение', sortable: true},
        {key: 'valueId', label: 'Пример значения (код)', sortable: true},
        {key: 'valueName', label: 'Название значения'}
      ],
      // att: '',
      // val: '',
      // fieldsProd: this.$store.getters.fieldsProd,
      // columns: {},
      file_name: 'Список'
    }
  },
  methods: {
    setLinksNames () {
      this.$store.commit('setLinksNames')
    },
    onLoadAttributes () {
      this.$store.commit('setAttProducts', this.$store.getters.products)
      this.$store.commit('setAttributesArray', this.$store.getters.products)
      this.attributes = this.$store.getters.attributesArray
    },
    onLoadValues (attId) {
      this.$store.commit('setAttProd', attId)
      this.$store.commit('setValues', attId)
    },
    onLoadAttLinks (attId) {
      this.currentAtt = attId
      this.$store.commit('setAttributeLinks', attId)
    }
  },
  computed: {
    modelAdeo () {
      return this.$store.getters.modelAdeo
    },
    attributes () {
      return this.$store.getters.attributesArray
    },
    productsQty () {
      return this.$store.getters.productsQty
    },
    productsSelected () {
      return this.$store.getters.productsSelected
    },
    attributeLinks () {
      return this.$store.getters.attributeLinks
    }
  }
}
</script>

<style scoped>

</style>
