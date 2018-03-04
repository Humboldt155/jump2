<template>
  <b-container fluid>
    <b-container fluid>
      <b-card sub-title="Model Adeo">

        <b-input-group size="md" prepend="MOD_">

          <b-form-input v-model.lazy="modelId" placeholder="введите номер или название модели, например 200767 или Дрели аккумуляторные"></b-form-input>

          <b-input-group-append>
            <b-btn variant="secondary" @click="onLoadModel">применить</b-btn>
          </b-input-group-append>

        </b-input-group>

        <b-container fluid>
          <br>

          <!-- Информация под строкой поиска: Название модели, подробное инфом ... -->
          <b-row>
            <b-col cols="6">
              <h4>{{ modelAdeo.russian_name }}</h4>
            </b-col>
            <b-col>
              <b-button variant="info" size="sm">
                артикулов:
                <b-badge variant="light">
                  0
                </b-badge>
              </b-button>
            </b-col>
            <b-col>
              <b-btn
                v-b-toggle.collapse1
                size="sm" variant="outline-info">
                  <span class="when-opened">info - </span>
                  <span class="when-closed">info + </span>
              </b-btn>
            </b-col>
          </b-row>

          <!-- Подробная информация о модели в раскрывающемся списке -->
          <b-collapse id="collapse1" class="mt-2">
            <b-card>
                {{ modelAdeo.id }}<br>
                <h4>Название</h4>
                <b-badge variant="info">French </b-badge> {{ modelAdeo.french_name }}<br>
                <b-badge variant="info">English</b-badge> {{ modelAdeo.english_name }}<br>
                <b-badge variant="info">Russian</b-badge> {{ modelAdeo.russian_name }}<br>
                <br>
                Артикулов: 237<br>
                 - из них AVS: 125<br>
                 - без описаний: 45<br>
                 - без AVS и описаний: 12<br>
                <br>
                Артикулов по отделам:<br>
                  4 отдел - 43 арт. (без AVS - 12)<br>
                  7 отдел - 17 арт. (без AVS - 4)<br>
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
            <b-btn
                v-b-toggle.collapse1
                size="sm" variant="outline-info">
                скрыть
              </b-btn>
          </b-collapse>

        </b-container>
      </b-card>
    </b-container>

    <!-- переключаемые вкладки (Таблица, Аналоги ...) -->
    <b-container fluid>
      <b-card no-body>
        <b-tabs pills card vertical v-model="tabIndex">
          <b-tab title="Table" active :title-link-class="linkClass(0)">
            <jump-model-table/>
          </b-tab>
          <b-tab title="Attributes" :title-link-class="linkClass(1)">
            <jump-model-attributes/>
          </b-tab>
          <b-tab title="Analogs" :title-link-class="linkClass(2)">
            <jump-model-analogs/>
          </b-tab>
          <b-tab title="Complementary" :title-link-class="linkClass(3)">
            <jump-model-complementary/>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>

  </b-container>
</template>

<script>

import AnalogsComponent from './model/analogs'
import AttributesComponent from './model/attributes'
import ComplementaryComponent from './model/complementary'
import ModelDetailsComponent from './model/modelDetails'
import TableComponent from './model/table'

export default {
  name: 'model',
  data () {
    return {
      tabIndex: 0,
      modelId: this.$store.getters.modelId
    }
  },
  methods: {
    linkClass (idx) {
      if (this.tabIndex === idx) {
        return ['bg-secondary', 'text-light']
      } else {
        return ['bg-light', 'text-secondary']
      }
    },
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
    setAllModels () {
      this.$store.dispatch('setAllModels')
    }
  },
  components: {
    'jump-model-analogs': AnalogsComponent,
    'jump-model-attributes': AttributesComponent,
    'jump-model-complementary': ComplementaryComponent,
    'jump-model-model-details': ModelDetailsComponent,
    'jump-model-table': TableComponent
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style>
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }
</style>
