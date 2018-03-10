<template>
  <b-container fluid>
    <h2>Раздел в разработке. Привязка аналогов по значениям атрибутов.</h2>
    <b-card v-for="select in selected" :key="select">
      <b-container fluid>
        <b-row>
          <b-col cols="1">
            {{ select + 1 }}
          </b-col>
          <b-col cols="4">
            <b-form-select v-model="analogs[select]" :options="attributes" @select="onSelectUpdate"></b-form-select>
          </b-col>
          <b-col>
            <strong>{{ analogs[select] }}</strong>
          </b-col>
          <b-col cols="1">
            <b-btn size="sm" variant="outline-warning" v-b-popover.hover="'Удалить'" @click="onRemoveAttribute">
              -
            </b-btn>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-button size="sm" variant="outline-info" @click="onAddAttribute">
      добавить атрибут
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: 'analogs',
  data () {
    return {
      analogs: {0: 'ATT_06575 - Марка', 1: 'ATT_00112 - Количество скоростей', 2: 'ATT_00115 - Ударная функция'},
      attributes: ['', 'ATT_06575 - Марка', 'ATT_00112 - Количество скоростей', 'ATT_00115 - Ударная функция'],
      selected: [0, 1, 2]
    }
  },
  methods: {
    onAddAttribute () {
      this.analogs[this.selected.length] = ''
      this.selected.push(this.selected.length)
    },
    onRemoveAttribute () {
      this.selected = this.selected.slice(0, this.selected.length - 1)
    }
  }
}
</script>

<style scoped>

</style>
