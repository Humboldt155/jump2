<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#/">Jump</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#/model">Model</b-nav-item>
          <b-nav-item href="#/models-list">Models List</b-nav-item>
          <b-nav-item href="#/product">Product</b-nav-item>

          <b-nav-form>
            <v-autocomplete placeholder="поиск по названию" :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems">
            </v-autocomplete>
            <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
            <router-link to="/model">
              <b-btn size="sm" variant="secondary" @click="onLoadModel">применить</b-btn>
            </router-link>
          </b-nav-form>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view></router-view>

  </div>
</template>

<script>

import SearchTemplate from './components/model/SearchTemplate.vue'

export default {
  name: 'App',
  data () {
    return {
      item: {},
      items: [],
      template: SearchTemplate
    }
  },
  methods: {
    onLoadModel: function () {
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
    setAllModels () {
      this.$store.dispatch('setAllModels')
    },
    modelId () {
      return this.$store.getters.modelId
    }
  }
}

</script>
