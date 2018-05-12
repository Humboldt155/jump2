<template>
  <b-container fluid>
    <br>
    <b-row>
      <b-col cols="2">
        <div>Отдел: <strong>{{ selected }}</strong></div>
        <b-form-select v-model="selected" :options="options" class="mb-3" size="sm"></b-form-select>
      </b-col>
      <b-col cols="1">
        <br>
        <b-btn size="sm"> &#8195;&laquo;&#8195; </b-btn>
      </b-col>
      <b-col>
        <div>Модель</div>
        <b-form-select v-model="selected" :options="options" class="mb-3" size="sm"></b-form-select>
      </b-col>
      <b-col cols="1">
        <br>
        <b-btn size="sm">&#8195;&raquo;&#8195;</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'analogs',
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: '--' },
        { value: 'a', text: '1' },
        { value: 'b', text: '2' },
        { value: 'c', text: '3' },
        { value: 'd', text: '4' },
        { value: 'e', text: '5' },
        { value: 'f', text: '6' },
        { value: 'g', text: '7' },
        { value: 'h', text: '8' },
        { value: 'i', text: '9' },
        { value: 'j', text: '10' },
        { value: 'k', text: '11' },
        { value: 'l', text: '12' },
        { value: 'm', text: '13' },
        { value: 'n', text: '14' },
        { value: 'o', text: '15' }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style scoped>

</style>
