<template>
  <b-container fluid>
    <b-card title="Атрибут">
      <b-row>
        <b-col cols="6">
          <b-input-group size="md">
            <b-form-input v-model.lazy="attribute" placeholder="код или название атрибута"></b-form-input>
            <b-input-group-append>
              <b-btn variant="secondary" @click="onLoadAttribute">Найти</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      {{ attributeInfo }}
    </b-card>
    <b-card title="Значение">
      <b-row>
        <b-col cols="6">
          <b-input-group size="md">
            <b-form-input v-model.lazy="value" placeholder="код или название значения"></b-form-input>
            <b-input-group-append>
              <b-btn variant="secondary" @click="onLoadValue">Найти</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      {{ value }}
    </b-card>
  </b-container>
</template>

<script>

import axios from 'axios'

export default {
  name: 'step',
  data () {
    return {
      attribute: '',
      value: '',
      attributeInfo: '',
      valueInfo: ''
    }
  },
  methods: {
    onLoadAttribute () {
      axios.get('http://humboldt155.pythonanywhere.com/api/attributes/', {
        params: {
          id: this.attribute
        }
      })
        .then(response => {
          this.attributeInfo = response.data[0]
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style scoped>

</style>
