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
      :fields="fields"
    >
          <template slot="table-caption">
            Перечень всех атрибутов модели: {{ modelAdeo.russian_name }}&nbsp;&nbsp;&nbsp;<b-btn size="sm" variant="outline-info" @click="onLoadAttributes">Показать</b-btn>
          </template>
      <template slot="values" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="outline-secondary">
          значения {{ row.detailsShowing ? '-' : '+'}}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card tag="article" style="max-width: 60rem" class="mb-2">
          <b-container fluid>
            <h5>{{ row.item.name }}</h5>
            <b-row>
              <b-col>
                <h6>Значения:</h6>
              </b-col>
              <b-col  cols="2">
                <h6>Количество артикулов</h6>
              </b-col>
              <b-col>
                <h6>Показать артикулы</h6>
              </b-col>
            </b-row >
            <b-row v-for="value in row.item['values']" :key="value">
              <b-col>
                {{ value[0] }}
              </b-col>
              <b-col  cols="2">
                {{ value[1] }}
              </b-col>
              <b-col>
                <b-button size="sm" @click="onShowProducts" variant="outline-info">
                  добавить в список
                </b-button>
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
      fields: [
        {key: 'name', label: 'Наименование атрибута', sortable: true},
        {key: 'qty', label: 'Заполнено, шт.', sortable: true},
        {key: 'percentage', label: 'Заполнено, %', sortable: true},
        {key: 'values', label: 'Значения'}
      ]
    }
  },
  methods: {
    onLoadAttributes () {
      this.$store.dispatch('setAttributes', this.$store.getters.products)
      this.attributes = this.$store.getters.attributes
    }
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
    }
  }
}
</script>

<style scoped>

</style>
