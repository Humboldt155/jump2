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
            значения {{ row.detailsShowing ? '-' : '+'}}
          </b-button>
        </template>
        <template slot="links" slot-scope="row">
          <b-button size="sm" @click="onLoadValuesLinks(row.item.id)" class="mr-2" variant="outline-info">
            links
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card tag="article" style="max-width: 60rem" class="mb-2">
            <b-container fluid>
              <b-row>
                <b-col cols="8">
                  <h5>{{ row.item.id }} - {{ row.item.russian_name }}</h5>
                  <p><b-badge variant="light">fra</b-badge> - {{ row.item.french_name }}<br>
                  <b-badge variant="light">eng</b-badge> - {{ row.item.english_name }}</p>
                </b-col>
                <b-col>
                </b-col>
              </b-row>
              <b-table
                bordered
                responsive
                hover
                small
                caption-top
                :items="row.item.values"
                :fields="fieldsVal"
              ></b-table>
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
      fieldsAtt: [
        {key: 'id', label: 'Код атрибута', sortable: true},
        {key: 'russian_name', label: 'Наименование атрибута', sortable: true},
        {key: 'qty', label: 'Заполнено, шт.', sortable: true},
        {key: 'percentage', label: 'Заполнено, %', sortable: true},
        {key: 'values', label: 'Значения'},
        {key: 'is_open', label: 'Тип', sortable: true},
        {key: 'links', label: 'Связи', sortable: true}
      ],
      fieldsVal: [
        {key: 'id', label: 'Код', sortable: true},
        {key: 'russian_name', label: 'Значение', sortable: true},
        {key: 'qty', label: 'Артикулы(шт)', sortable: true},
        {key: 'products', label: 'Список'},
        {key: 'links', label: 'Связи'}
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
      this.$store.commit('setAttributesArray', this.$store.getters.products)
      this.attributes = this.$store.getters.attributesArray
    },
    onLoadValues (att) {
      this.$store.commit('setValues', att)
    },
    onLoadValuesLinks (attId) {
      this.$store.commit('setAttributeLinks', attId)
    }
    // onCreateProductsList (val, att) {
    //   this.att = att
    //   this.val = val
    //   let productsSelected = []
    //   let columns = {
    //     'Код продукта': 'Код продукта',
    //     'ATT_12963 - Название на сайте': 'ATT_12963 - Название на сайте'
    //   }
    //   columns[att] = att
    //   this.columns = columns
    //
    //   this.file_name = att.concat('.xls')
    //
    //   if (val === 'Не заполнено') {
    //     productsSelected = this.$store.getters.products.filter(function (el) {
    //       return el[att] === ''
    //     })
    //   } else {
    //     productsSelected = this.$store.getters.products.filter(function (el) {
    //       return el[att] === val
    //     })
    //   }
    //   this.$store.dispatch('setProductsSelected', productsSelected)
    // }
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
