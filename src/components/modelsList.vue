<template>
  <b-container fluid>

          <b-row class="my-1" v-for="model in allModels" :key="model">
            <b-col>
              MOD_
              <b-badge variant="info">{{ model.id.slice(4) }}</b-badge>
               {{ model.russian_name }}

              <!--<b-button size="sm" variant="link" @click="this.$store.dispatch('setModelId', 'model.id')"> перейти </b-button>-->

            </b-col>
          </b-row>

  </b-container>
</template>

<script>
export default {
  name: 'models-list',
  data () {
    return {
      allModels: this.$store.getters.allModels
    }
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  },
  computed () {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style scoped>

</style>
