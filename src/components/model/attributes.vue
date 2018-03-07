<template>
  <b-container fluid>
    {{ attributes }}
  </b-container>
</template>

<script>
export default {
  name: 'attributes',
  computed: {
    attributes () {
      return this.$store.getters.attributes
    }
  }
}
</script>

<style scoped>

</style>
