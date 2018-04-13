<template>
  <b-container fluid>

    {{ modelAdeo.id }} - {{ modelAdeo.russian_name }}<br>
    <h5>Название</h5>
    <b-badge variant="">French </b-badge> {{ modelAdeo.french_name }}<br>
    <b-badge variant="primary">English</b-badge> {{ modelAdeo.english_name }}<br>
    <b-badge variant="success">Russian</b-badge> {{ modelAdeo.russian_name }}<br><br>

    <!--Схожие модели из этой же группы-->
    <h5> Выбранная модель в структуре Адео:</h5><br>

    <h4>{{ modelAdeo.model_group_adeo.slice(4,6) }}</h4>

    <b-container fluid>

      <h5> {{ modelsList.id }}</h5>

      <b-container fluid v-for="mg in modelsList.list" :key="mg.id">
        <h6>{{ mg.id }}</h6>
          <b-container fluid>
            <b-row class="my-1" v-for="modelH in mg.list" :key="modelH.id">
              <b-col cols="6">
                <b-button v-if="modelH.id===modelAdeo.id" size="sm" variant="warning" @click="pushModel(modelH.id)"> {{ modelH.id }} </b-button>
                <b-button v-else size="sm" variant="outline-info" @click="pushModel(modelH.id)"> {{ modelH.id }} </b-button>
                {{ modelH.russian_name }}
              </b-col>
              <b-col>
                <b-badge variant="secondary">fr: </b-badge>
                {{ modelH.french_name }}
              </b-col>
              <b-col>
                <b-badge variant="secondary">en: </b-badge>
                {{ modelH.english_name }}
              </b-col>
            </b-row>
          </b-container>
        </b-container>
      </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'model-details',
  methods: {
    onLoadModel: function () {
      this.$store.dispatch('setProductsSelected', [])
      this.$store.dispatch('setModelLinks', this.modelId)
      this.$store.commit('setAttributes', [])
      this.$store.commit('emptyAttributesArray')
      this.$store.dispatch('setModelId', this.modelId)
      this.$store.dispatch('setProducts', this.modelId)
      this.$store.dispatch('setModelAdeo', this.modelId)
    },
    pushModel: function (id) {
      this.modelId = id.slice(4)
      this.onLoadModel()
    }
  },
  computed: {
    modelAdeo () {
      return this.$store.getters.modelAdeo
    },
    modelsList () {
      return this.$store.getters.modelsList
    }
  }
}
</script>

<style scoped>

</style>
