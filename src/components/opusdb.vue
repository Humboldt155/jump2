<template>
  <b-container fluid>
    Выгрузка данных из Опус
    <b-button size="sm" @click="setOpusdb" variant="outline-info">
      загрузить данные
    </b-button>
    <b-row>
      <b-col cols="4">
        <h5>Загружено строк: <b-badge variant="info">{{ opusdb.length }}</b-badge></h5>
        <h5>Загружено артикулов: <b-badge variant="info">{{ opusCurrent }}</b-badge></h5>
      </b-col>
      <b-col>
        <download-excel
          class   = "btn btn-default"
          :data   = "opusdb"
          :fields = "columns"
          name    = "Все данные OPUS.xls">
          <b-button size="md" variant="warning">
            Скачать
          </b-button>
        </download-excel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'opusdb',
  data () {
    return {
      fieldsProd: this.$store.getters.fieldsProd,
      columns: {code: 'code', model: 'model', attCode: 'attCode', attName: 'attName', value: 'value'}
    }
  },
  methods: {
    setOpusdb () {
      this.$store.commit('setOpusdb')
    }
  },
  computed: {
    opusdb () {
      return this.$store.getters.opusdb
    },
    opusCurrent () {
      return this.$store.getters.opusCurrent
    }
  }
}
</script>

<style scoped>

</style>
