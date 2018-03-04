<template>
  <b-container fluid>

        {{ modelAdeo.id }} - {{ modelAdeo.russian_name }}<br>
        <h5>Название</h5>
        <b-badge variant="">French </b-badge> {{ modelAdeo.french_name }}<br>
        <b-badge variant="primary">English</b-badge> {{ modelAdeo.english_name }}<br>
        <b-badge variant="success">Russian</b-badge> {{ modelAdeo.russian_name }}<br>
                <br>
        <h5>Артикулов:</h5>
        <b-badge variant="light">ВСЕГО             </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.total }}<br>
        <b-badge variant="light">c AVS:              </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.total - productsQty.avs }}<br>
        <b-badge variant="success">без AVS:            </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.avs }}<br>
        <b-badge variant="success">c описаниями        </b-badge>&nbsp;&nbsp;{{ productsQty.description }}<br>
        <b-badge variant="warning">без описаний        </b-badge>&nbsp;&nbsp;{{ productsQty.total - productsQty.description }}<br>
        <br>
        <!--Схожие модели из этой же группы-->
        <h5>Ближайшие модели (3 уровень Адео)</h5>
        <b-container fluid>
          <b-row class="my-1" v-for="closeModel in closeModels" :key="closeModel">
            <b-col cols="6">
              <b-button size="sm" variant="outline-info" @click="pushModel(closeModel.id)"> {{ closeModel.id }} </b-button>
              {{ closeModel.russian_name }}
            </b-col>
            <b-col>
              <b-badge variant="secondary">fr: </b-badge>
              {{ closeModel.french_name }}
            </b-col>
            <b-col>
              <b-badge variant="secondary">en: </b-badge>
              {{ closeModel.english_name }}
            </b-col>
          </b-row>
        </b-container>
        <br>
        <h5>Ближайшие модели (2 уровень Адео)</h5>
          <b-btn v-b-toggle.collapse1 variant="outline-info">
            <span class="when-opened">скрыть</span>
            <span class="when-closed">показать</span>
          </b-btn>
          <b-collapse id="collapse1">
            <b-container fluid>
              <b-row class="my-1" v-for="nearModel in nearModels" :key="nearModel">
                <b-col cols="6">
                  <b-button size="sm" variant="outline-info" @click="pushModel(nearModel.id)"> {{ nearModel.id }} </b-button>
                  {{ nearModel.russian_name }}
                </b-col>
                <b-col>
                  <b-badge variant="secondary">fr: </b-badge>
                  {{ nearModel.french_name }}
                </b-col>
                <b-col>
                  <b-badge variant="secondary">en: </b-badge>
                  {{ nearModel.english_name }}
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>

  </b-container>
</template>

<script>
export default {
  name: 'model-details',
  methods: {
    onLoadModel: function () {
      this.$store.dispatch('setModelId', this.modelId)
      this.$store.dispatch('setProducts', this.modelId)
      this.$store.dispatch('setModelOpus', this.modelId)
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
    closeModels () {
      return this.$store.getters.closeModels
    },
    nearModels () {
      return this.$store.getters.nearModels
    },
    productsQty () {
      return this.$store.getters.productsQty
    }
  }
}
</script>

<style scoped>

</style>
