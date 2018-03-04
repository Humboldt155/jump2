<template>
  <b-container>
      <b-card>
        {{ modelAdeo.id }}<br>
        <h4>Название</h4>
        <b-badge variant="info">French </b-badge> {{ modelAdeo.french_name }}<br>
        <b-badge variant="info">English</b-badge> {{ modelAdeo.english_name }}<br>
        <b-badge variant="info">Russian</b-badge> {{ modelAdeo.russian_name }}<br>
                <br>
        <h5>Артикулов:</h5>
        <b-badge variant="light">ВСЕГО             </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.total }}<br>
        <b-badge variant="light">c AVS:              </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.total - productsQty.avs }}<br>
        <b-badge variant="success">без AVS:            </b-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ productsQty.avs }}<br>
        <b-badge variant="success">c описаниями        </b-badge>&nbsp;{{ productsQty.description }}<br>
        <b-badge variant="warning">без описаний        </b-badge>&nbsp;&nbsp;{{ productsQty.total - productsQty.description }}<br>
        <br>
        Артикулов по отделам:<br>
        _ отдел - _ арт. (без AVS - _ )<br>
        <br>
        <!--Схожие модели из этой же группы-->
        <h4>Группа моделей</h4>
        <b-container fluid>
          <b-row class="my-1" v-for="closeModel in closeModels" :key="closeModel">
            <b-col>
              <b-badge variant="info">{{ closeModel.id }}</b-badge>
              {{ closeModel.russian_name }}
              <b-button size="sm" variant="link" @click="pushModel(closeModel.id)"> перейти </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'model-details',
  computed: {
    modelAdeo () {
      return this.$store.getters.modelAdeo
    },
    closeModels () {
      return this.$store.getters.closeModels
    },
    productsQty () {
      return this.$store.getters.productsQty
    }
  }
}
</script>

<style scoped>

</style>
