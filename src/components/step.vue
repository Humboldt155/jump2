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
    </b-card>    <b-card title="Модель">
      <b-row>
        <b-col cols="6">
          <b-input-group size="md">
            <b-form-input v-model.lazy="modelId" placeholder="модель"></b-form-input>
            <b-input-group-append>
              <b-btn variant="secondary" @click="setModelLinks">Найти</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    <b-container fluid v-for="att in attributesAll" :key="att">
        <b-row>
          <b-col cols="2">
            {{ att['code'] }}
          </b-col>
          <b-col cols="1">
            {{ att['is_open'] }}
          </b-col>
          <b-col>
            {{ att['french_name'] }}
          </b-col>
          <b-col>
            {{ att['english_name'] }}
          </b-col>
          <b-col>
            {{ att['russian_name'] }}
          </b-col>
          <b-col>
            {{ att['values'] }}
          </b-col>
        </b-row>
    </b-container>
    </b-card>
    {{valuesAll}}
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
      valueInfo: '',
      modelId: '',
      resp: ''
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
          this.attributeInfo = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    setModelLinks () {
      this.$store.dispatch('setModelLinks', this.modelId)
    },
    onLoadModel () {
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
  },
  computed: {
    modelLinks () {
      return this.$store.getters.modelLinks
    },
    attributesAll () {
      return this.$store.getters.attributesAll
    },
    valuesAll () {
      return this.$store.getters.valuesAll
    }
  }
}
</script>

<style scoped>

</style>
