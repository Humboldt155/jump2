<template>
  <b-container>
    <b-card sub-title="Поиск модели по названию">
      <b-row>
        <b-col cols="3">
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
        </b-col>
        <b-col cols="4">
          <router-link to="/model">
            <b-btn size="sm" variant="secondary" @click="onLoadModel">применить</b-btn>
          </router-link>
        </b-col>
        <b-col>
          <b-col>
            <b-form-checkbox
              id="checkbox1"
              v-model="isLoadAvs"
              @change="setIsLoadAvs">
              загружать avs
            </b-form-checkbox>
          </b-col>
        </b-col>
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
      this.$store.commit('emptyAttributesArray')
      this.$store.dispatch('setProductsSelected', [])
      this.$store.dispatch('setModelLinks', this.modelId)
      this.$store.commit('setAttributes', [])
      this.$store.dispatch('setModelId', this.modelId)
      this.$store.dispatch('setProducts', this.modelId)
      this.$store.dispatch('setModelAdeo', this.modelId)
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
    },
    setIsLoadAvs () {
      let avs = this.$store.getters.isLoadAvs
      this.$store.commit('setIsLoadAvs', !avs)
    }
  },
  computed: {
    modelId () {
      return this.$store.getters.modelId
    },
    isLoadAvs () {
      return this.$store.getters.isLoadAvs
    }
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style scoped>

</style>
