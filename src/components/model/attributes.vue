<template>
  <b-container fluid>
    <p></p><br>
        <b-table
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
        <!--<template slot="values" slot-scope="row">-->
          <!--<b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="outline-secondary">-->
            <!--значения {{ row.detailsShowing ? '-' : '+'}}-->
          <!--</b-button>-->
        <!--</template>-->
        <!--<template slot="row-details" slot-scope="row">-->
          <!--<b-card tag="article" style="max-width: 60rem" class="mb-2">-->
            <!--<b-container fluid>-->
              <!--<h5>{{ row.item.name }}</h5>-->
              <!--<b-row>-->
                <!--<b-col>-->
                  <!--<h6>Значения:</h6>-->
                <!--</b-col>-->
                <!--<b-col  cols="2">-->
                  <!--<h6>Количество артикулов</h6>-->
                <!--</b-col>-->
                <!--<b-col>-->
                  <!--<h6>Список</h6>-->
                <!--</b-col>-->
              <!--</b-row >-->
              <!--<b-row v-for="value in row.item['values']" :key="value">-->
                <!--<b-col>-->
                  <!--{{ value[0] }}-->
                <!--</b-col>-->
                <!--<b-col  cols="2">-->
                  <!--{{ value[1] }}-->
                <!--</b-col>-->
                <!--<b-col>-->
                  <!--<b-button v-if="value[0]==='Не заполнено'" size="sm" @click="onCreateProductsList(value[0], row.item.code.concat(' - ', row.item.name))" variant="outline-secondary">-->
                    <!--список артикулов-->
                  <!--</b-button>-->
                  <!--<b-button v-else size="sm" @click="onCreateProductsList(value[0], row.item.code.concat(' - ', row.item.name))" variant="outline-info">-->
                    <!--список артикулов-->
                  <!--</b-button>-->
                <!--</b-col>-->
              <!--</b-row>-->
            <!--</b-container>-->
          <!--</b-card>-->
        <!--</template>-->
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
      fieldsAtt: [
        {key: 'id', label: 'Код атрибута', sortable: true},
        {key: 'is_open', label: 'Тип', sortable: true},
        {key: 'russian_name', label: 'Наименование атрибута', sortable: true},
        {key: 'qty', label: 'Заполнено, шт.', sortable: true},
        {key: 'percentage', label: 'Заполнено, %', sortable: true},
        {key: 'values', label: 'Значения'}
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
      this.$store.dispatch('setAttributes', this.$store.getters.products, this.$store.getters.attributesAll)
      this.attributes = this.$store.getters.attributes
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
      return this.$store.getters.attributes
    },
    productsQty () {
      return this.$store.getters.productsQty
    },
    productsSelected () {
      return this.$store.getters.productsSelected
    }
  }
}
</script>

<style scoped>

</style>
