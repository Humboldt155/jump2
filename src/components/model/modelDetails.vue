<template>
  <b-container fluid>

    {{ modelAdeo.id }} - {{ modelAdeo.russian_name }}<br>
    <h5>Название</h5>
    <b-badge variant="">French </b-badge> {{ modelAdeo.french_name }}<br>
    <b-badge variant="primary">English</b-badge> {{ modelAdeo.english_name }}<br>
    <b-badge variant="success">Russian</b-badge> {{ modelAdeo.russian_name }}<br><br>

    <b-badge variant="light">Отдел Adeo</b-badge> {{ (modelAdeo.model_group_adeo.slice(4,6)) }}<br>
    <b-badge variant="light">Подотдел Adeo</b-badge> {{ modelsList[0] }}<br>
    <br>
    <h5>Артикулов:</h5>
    <b-badge variant="light">ВСЕГО             </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.total }}<br>
    <b-badge variant="success">c описаниями        </b-badge>&nbsp;&nbsp;{{ productsQty.description }}<br>
    <b-badge variant="warning">без описаний        </b-badge>&nbsp;&nbsp;{{ productsQty.total - productsQty.description }}<br>
    <br>

    <!--Схожие модели из этой же группы-->
    <h5> Выбранная модель в иерархии Адео:</h5><br>

    <h4>{{ (modelAdeo.model_group_adeo.slice(4,6)) }}</h4>

    <b-container fluid>

      <h5> {{ modelsList[0] }}</h5>

      <b-container fluid v-for="mg in modelsList[1]" :key="mg">
        <h6>{{ mg[0] }}</h6>
          <b-container fluid>
            <b-row class="my-1" v-for="modelH in mg[1]" :key="modelH">
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
      this.$store.dispatch('setModelId', this.modelId)
      this.$store.dispatch('setProducts', this.modelId)
      this.$store.dispatch('setModelAdeo', this.modelId)
      const mg = this.$store.getters.modelGroup
      this.$store.dispatch('setModelGroupId', mg.toString())
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
    },
    productsQty () {
      return this.$store.getters.productsQty
    }
  }
}
</script>

<style scoped>

</style>
