<template>
  <b-container fluid>
    Перечень всех атрибутов модели: {{ modelAdeo.russian_name }}&nbsp;&nbsp;&nbsp;<b-btn size="sm" variant="outline-info" @click="onLoadAttributes">Показать</b-btn>
    <p></p><br>
        <b-table
      bordered
      responsive
      hover
      small
      :items="attributes"
      :fields="fields"
    >
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
        {key: 'qty', label: 'Заполнено', sortable: true},
        {key: 'percentage', label: '%', sortable: true}
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
