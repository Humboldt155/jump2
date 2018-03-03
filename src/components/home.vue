<template>
  <b-container>
    <b-row class="text-center">
        <b-col>
          <h1><br><br><br>Jump<br><br></h1>
        </b-col>
    </b-row>
    <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="4"></b-col>
        <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    this.$store.dispatch('setAllModels')
  },
  computed() {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style scoped>

</style>
