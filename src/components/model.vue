<template>
  <b-container fluid>
    <b-container fluid>
      <b-card sub-title="Model Adeo">
        <b-container fluid>
          <b-row>
            <b-col cols="8">
              <b-input-group size="md" prepend="MOD_">

                <b-form-input v-model.lazy="modelId" placeholder="введите номер или название"></b-form-input>

                <b-input-group-append>
                  <b-btn variant="secondary" @click="onLoadModel">применить</b-btn>
                </b-input-group-append>

              </b-input-group>
              <div v-if="modelId.length>=3">
                <b-form-group>
                  <b-form-radio-group id="btnradios3"
                                      buttons
                                      button-variant="outline-secondary"
                                      stacked
                                      v-model="modelId"
                                      :options="options"
                                      name="radioBtnStacked">
                  </b-form-radio-group>
                </b-form-group>
              </div>
              <div v-else></div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-checkbox
                id="checkbox1"
                v-model="isLoadAvs"
                @change="setIsLoadAvs">
                загружать avs
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-container>

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
          </b-row>

          <!-- Подробная информация о модели в раскрывающемся списке -->

        </b-container>
          <b-alert variant="warning" :show="isLoaded">
            <h5>Ждите, идет загрузка...</h5><br>
            <b-progress show-progress :precision="1" :value="productsQty.total" :max="totalCount" variant="warning"></b-progress>
          </b-alert>
      </b-card>
    </b-container>

    <!-- переключаемые вкладки (Таблица, Аналоги ...) -->
    <b-container fluid>
        <b-tabs pills card v-model="tabIndex">
          <b-tab title="Таблица" active :title-link-class="linkClass(0)">
            <jump-model-table/>
          </b-tab>
          <b-tab title="Атрибуты" :title-link-class="linkClass(1)">
            <jump-model-attributes/>
          </b-tab>
          <b-tab title="Аналоги" :title-link-class="linkClass(2)">
            <jump-model-analogs/>
          </b-tab>
          <b-tab title="Комплементы" :title-link-class="linkClass(3)">
            <jump-model-complementary/>
          </b-tab>
          <b-tab title="Информация о модели" :title-link-class="linkClass(4)">
            <jump-model-model-details/>
          </b-tab>
        </b-tabs>
    </b-container>

  </b-container>
</template>

<script>

import SearchTemplate from './model/SearchTemplate.vue'

import AnalogsComponent from './model/analogs'
import AttributesComponent from './model/attributes'
import ComplementaryComponent from './model/complementary'
import ModelDetailsComponent from './model/modelDetails'
import TableComponent from './model/productsTable'

export default {
  name: 'model',
  data () {
    return {
      item: {id: 'MOD_123456', russian_name: 'Russian Name', english_name: 'English Name', french_name: 'French Name'},
      items: [],
      template: SearchTemplate,
      tabIndex: 0,
      modelId: this.$store.getters.modelId
    }
  },
  methods: {
    getLabel (item) {
      if (item) {
        return item.id.slice(4)
      } else {
        return ''
      }
    },
    updateItems (text) {
      this.items = this.$store.getters.allModels.filter((item) => {
        return (new RegExp(text.toLowerCase())).test(item.russian_name.toLowerCase())
      })
    },
    linkClass (idx) {
      if (this.tabIndex === idx) {
        return ['bg-secondary', 'text-light']
      } else {
        return ['bg-light', 'text-secondary']
      }
    },
    onLoadModel: function () {
      this.$store.dispatch('setModelLinks', this.modelId)
      this.$store.dispatch('setProductsSelected', [])
      this.$store.commit('setAttributes', [])
      this.$store.commit('emptyAttributesArray')
      this.$store.dispatch('setModelId', this.modelId)
      this.$store.dispatch('setProducts', this.modelId)
      this.$store.dispatch('setModelAdeo', this.modelId)
    },
    pushModel: function (id) {
      this.modelId = id.slice(4)
      this.onLoadModel()
    },
    setIsLoadAvs () {
      let avs = this.$store.getters.isLoadAvs
      this.$store.commit('setIsLoadAvs', !avs)
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
      return !(this.$store.getters.totalCount === this.$store.getters.productsQty.total)
    },
    closeModels () {
      return this.$store.getters.closeModels
    },
    productsQty () {
      return this.$store.getters.productsQty
    },
    isLoadAvs () {
      return this.$store.getters.isLoadAvs
    },
    options () {
      let searchText = this.modelId.toString().toLowerCase()
      let options = this.$store.getters.options
      if (options.length === 1) {
        return [{value: 0, text: ''}]
      } else {
        return options.filter(function (f) {
          return f.text.toString().toLowerCase().includes(searchText)
        })
      }
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
