<template>
  <b-container>
    <b-card sub-title="Поиск модели по названию">
      <b-row>
        <v-autocomplete placeholder="поиск по названию"
                        :items="items"
                        v-model="item"
                        min-len='3'
                        :get-label="getLabel"
                        :component-item='template'
                        keep-open="true"
                        auto-select-one-item="true"
                        @update-items="updateItems">
        </v-autocomplete>
        <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
        <router-link to="/model">
          <b-btn size="sm" variant="secondary" @click="onLoadModel">применить</b-btn>
        </router-link>
      </b-row>
      <br>
      <b-row>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>

import SearchTemplate from './model/SearchTemplate.vue'

export default {
  name: 'search.vue',
  data () {
    return {
      item: {},
      items: [],
      template: SearchTemplate
    }
  },
  methods: {
    onLoadModel: function () {
      this.$store.dispatch('setProductsSelected', [])
      this.$store.dispatch('setModelLinks', this.modelId)
      this.$store.commit('setAttributes', [])
      this.$store.dispatch('setModelId', this.modelId)
      this.$store.dispatch('setProducts', this.modelId)
      this.$store.dispatch('setModelAdeo', this.modelId)
      const mg = this.$store.getters.modelGroup
      this.$store.dispatch('setModelGroupId', mg.toString())
    },
    getLabel (item) {
      if (item) {
        const modelId = item.id.slice(4)
        this.$store.dispatch('setModelId', modelId)
        return modelId
      } else {
        return ''
      }
    },
    updateItems (text) {
      this.items = this.$store.getters.allModels.filter((item) => {
        return (new RegExp(text.toLowerCase())).test(item.russian_name.toLowerCase())
      })
    }
  },
  computed: {
    modelId () {
      return this.$store.getters.modelId
    }
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style scoped>

</style>
