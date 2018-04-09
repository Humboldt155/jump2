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
                      <b-card>
                        {{ (currentAtt === row.item.id) ? attributeLinks : '' }}
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
    <!--список артикулов-->
    <!--<b-table-->
      <!--bordered-->
      <!--responsive-->
      <!--hover-->
      <!--small-->
      <!--caption-top-->
      <!--:items="productsSelected"-->
      <!--:fields="fieldsProd"-->
    <!--&gt;-->
      <!--<template slot="table-caption">-->
        <!--<b-container fluid>-->
          <!--<b-row>-->
            <!--<b-col cols="8">-->
              <!--<h5><b-badge variant="info">Список артикулов:</b-badge> {{ att }} = {{ val }}</h5>-->
            <!--</b-col>-->
            <!--<b-col>-->
              <!--<download-excel-->
                <!--class   = "btn btn-default"-->
                <!--:data   = "productsSelected"-->
                <!--:fields = "columns"-->
                <!--:name    = "file_name">-->
                <!--<b-button size="sm" variant="info">-->
                  <!--Download EXCEL-->
                <!--</b-button>-->
              <!--</download-excel>-->
            <!--</b-col>-->
          <!--</b-row>-->
        <!--</b-container>-->
      <!--</template>-->
    <!--</b-table>-->
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
      // att: '',
      // val: '',
      // fieldsProd: this.$store.getters.fieldsProd,
      // columns: {},
      file_name: 'Список'
    }
  },
  methods: {
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
