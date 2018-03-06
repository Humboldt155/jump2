<template>
  <b-container fluid>
    <b-container fluid>
      <b-card sub-title="Model Adeo">

        <b-input-group size="md" prepend="MOD_">

          <b-form-input v-model.lazy="modelId" placeholder="введите номер модели, например 200767, и нажмите ПРИМЕНИТЬ"></b-form-input>

          <b-input-group-append>
            <b-btn variant="secondary" @click="onLoadModel">применить</b-btn>
          </b-input-group-append>

        </b-input-group>

        <b-container fluid>
          <br>

          <!-- Информация под строкой поиска: Название модели, подробное инфом ... -->
          <b-row>
            <b-col>
              {{ modelAdeo.id }}
            </b-col>
            <b-col cols="6">
              <h5>{{ modelAdeo.russian_name }}</h5>
            </b-col>
            <b-col>
              <b-button variant="info" size="sm">
                артикулов:
                <b-badge variant="light">
                  {{ productsQty.total }}
                </b-badge>
              </b-button>
            </b-col>
            <b-col>
              <b-button variant="info" size="sm">
                без avs:
                <b-badge variant="light">
                  {{ productsQty.avs }}
                </b-badge>
              </b-button>
            </b-col>
          </b-row>

          <!-- Подробная информация о модели в раскрывающемся списке -->

        </b-container>
          <b-alert variant="info" :show="isLoaded">
            <h5>Ждите, идет загрузка...</h5><br>
            <b-progress show-progress :precision="1" :value="productsQty.total" :max="totalCount" variant="warning"></b-progress>
          </b-alert>
      </b-card>
    </b-container>

    <!-- переключаемые вкладки (Таблица, Аналоги ...) -->
    <b-container fluid>
        <b-tabs pills card v-model="tabIndex">
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
          <b-tab title="Model Info" :title-link-class="linkClass(4)">
            <jump-model-model-details/>
          </b-tab>
        </b-tabs>
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
      // this.$store.dispatch('setModelOpus', this.modelId)
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
    totalCount () {
      return this.$store.getters.totalCount
    },
    isLoaded () {
      return this.$store.getters.isLoaded
    },
    closeModels () {
      return this.$store.getters.closeModels
    },
    productsQty () {
      return this.$store.getters.productsQty
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
