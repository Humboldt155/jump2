<template>
  <b-container fluid>
    <b-card sub-title="Поиск артикула">
      <b-row>
        <b-col cols="6">
          <b-input-group size="md" >
            <b-form-input v-model.lazy="productId" placeholder="вставьте артикул и нажмите НАЙТИ"></b-form-input>
            <b-input-group-append>
              <b-btn variant="secondary" @click="onLoadProduct">найти</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card sub-title="Модель Adeo">
      <b-container fluid>
        <b-row>
          <b-col cols="6">
            <router-link to="/model">
              <b-btn size="sm" variant="outline-info" @click="pushModel(productModelId)">{{ productModel.id }}</b-btn>
            </router-link>
            {{ productModel.russian_name }}
          </b-col>
          <b-col>
            <b-badge variant="secondary">fr: </b-badge>
            {{ productModel.french_name }}
          </b-col>
          <b-col>
            <b-badge variant="secondary">en: </b-badge>
            {{ productModel.english_name }}
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-card>
      <b-container fluid>
        <b-row v-for="att in productAttributes" :key="att">
          <b-col>
            {{ att.code }}
          </b-col>
          <b-col>
            {{ att.value }}
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      productId: ''
    }
  },
  methods: {
    pushModel: function (id) {
      this.$store.dispatch('setProductsSelected', [])
      this.$store.commit('setAttributes', [])
      this.$store.dispatch('setModelId', id)
      this.$store.dispatch('setProducts', id)
      this.$store.dispatch('setModelAdeo', id)
      const mg = this.$store.getters.modelGroup
      this.$store.dispatch('setModelGroupId', mg.toString())
    },
    onLoadProduct () {
      this.$store.dispatch('setProductAttributes', this.productId)
    }
  },
  computed: {
    productAttributes () {
      return this.$store.getters.productAttributes
    },
    productModelId () {
      return this.$store.getters.productModelId
    },
    productModel () {
      return this.$store.getters.productModel
    }
  }
}
</script>

<style scoped>

</style>
