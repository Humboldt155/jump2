<template>
  <b-container fluid>
    Выгрузка данных из Опус
    <b-button size="sm" @click="setOpusdb" variant="outline-info">
      загрузить данные
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: 'opusdb',
  methods: {
    setOpusdb () {
      this.$store.dispatch('setOpusdb')
    }
  }
}
</script>

<style scoped>

</style>
