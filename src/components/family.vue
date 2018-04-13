<template>
    <b-container fluid>
      <b-row>
        <b-col>
          <p>Семьи</p>
          <b-btn size="sm" variant="info" @click="setFamilies">Список семей</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ families }}
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'family',
  data () {
    return {
      i: 0
    }
  },
  methods: {
    setFamilies () {
      this.$store.dispatch('setFamilies')
    }
  },
  computed: {
    families () {
      return this.$store.getters.families
    }
  }
}
</script>

<style scoped>

</style>
