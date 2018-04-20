<template>
    <b-container fluid>
      <h4>Семьи (товарные категории на сайте)</h4>
      <br>
      <b-row>
        <b-col>
          <b-col>
            Загружено {{ families.length }} семей
          </b-col>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col cols="8">
          <b-input-group prepend="Семья">
            <b-form-input v-model.lazy="searchText" placeholder="введите название и нажмите Начать анализ"></b-form-input>
            <b-input-group-append>
              <b-btn variant="secondary" @click="setFamilyProducts(searchText)">Получить список</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="searchText.length>=3">
          <b-form-group>
            <b-form-radio-group id="btnradios3"
                                buttons
                                button-variant="outline-secondary"
                                stacked
                                v-model="searchText"
                                :options="options"
                                name="radioBtnStacked">
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col v-else></b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ familyProducts }}
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'family',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    setFamilyProducts(familyId) {
      this.$store.commit('setFamilyProducts', [])
      this.$store.dispatch('setFamilyProducts', familyId)
    }
  },
  computed: {
    families () {
      return this.$store.getters.families
    },
    totalCountFamily () {
      return this.$store.getters.totalCountFamily
    },
    familyProducts () {
      return this.$store.getters.familyProducts
    },
    options () {
      let name = this.searchText.toString().toLowerCase()
      if (this.families.length === 1) {
        return [{value: 0, text: ''}]
      } else {
        return this.families.filter(function (f) {
          return f.text.toString().toLowerCase().includes(name)
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('setFamilies')
  }
}
</script>

<style scoped>

</style>
