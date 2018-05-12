<template>

    <b-card title="Настройка аналогов">
      <b-container fluid>
        <!--Панель выбора-->
        <b-row>
          <b-col cols="5">
            Отдел: &#8195;<strong>{{ department }}</strong>
            <br>
          </b-col>
          <b-col>
            Модель:
            <br>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2">
            <b-form-select v-model="department" :options="departments" class="mb-3" size="sm"></b-form-select>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col cols="1">
            <b-btn size="sm" variant="outline-info" @click="(model === 0 || model === null) ? model=(models.length - 1) : model--"> &#8195;&laquo;&#8195; </b-btn>
          </b-col>
          <b-col cols="6">
            <b-form-select v-model="model" :options="models" size="sm"></b-form-select>
          </b-col>
          <b-col cols="1">
            <b-btn size="sm" variant="outline-info" @click="model === (models.length-1) ? model=0 : model++">&#8195;&raquo;&#8195;</b-btn>
          </b-col>
        </b-row>

        <!--Атрибуты-->
        <br>
        Атрибуты<font-awesome-icon :icon="icon" />
        <b-row>
          <b-col>
            <b-list-group>
              <!--Атрибут-->
              <b-list-group-item class="d-flex justify-content-between align-items-center"
              v-for="att in attributes" :key="att">
                <b-container fluid>
                  <b-row>
                    <b-col>
                      {{ att.code }} - {{ att.name }}
                    </b-col>
                    <!--Тип-->
                    <b-col cols="2">
                      <b-badge pill :variant="types[att.type][1]">{{ types[att.type][0] }}&#8195;<font-awesome-icon :icon="icons[types[att.type][2]]" /></b-badge>
                    </b-col>

                    <!--Настройк, кнопка-->
                    <b-col cols="2">
                      <b-btn @click="att.show_settings = !att.show_settings"
                             size="sm" variant="outline-info">настроить</b-btn>
                     </b-col>
                    <!--Удалить-->
                    <b-col cols="1">
                      <b-btn v-b-tooltip.hover title="Удалить атрибут" size="sm" variant="outline-warning">-</b-btn>
                    </b-col>
                  </b-row>
                  <!--Настройка атрибута-->
                  <b-row>
                    <b-col v-if="att.show_settings">
                      <b-container fluid>
                        <b-row>
                          Настройка значений:
                        </b-row>
                        <b-row>

                        </b-row>
                      </b-container>
                    </b-col>
                    <b-row v-else>
                    </b-row>
                  </b-row>

                </b-container>

              <!--Добавить атрибут-->
              </b-list-group-item>
              <b-list-group-item variant="info" button>
                <b-row>
                  <b-col cols="5"></b-col>
                  <b-col>добавить атрибут +</b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col cols="10">
            <b-button variant="outline-info" size="sm">Сохранить изменения</b-button>
          </b-col>
          <b-col>
            <b-button variant="outline-secondary" size="sm">Сбросить</b-button>
          </b-col>
        </b-row>

        <!--Предпросмотр-->
        <b-row>
          <b-col>
            Предпросмотр
          </b-col>
        </b-row>

        <!--Не заполненные-->
        <b-row>
          <b-col>
            Не заполненные
          </b-col>
        </b-row>
      </b-container>
    </b-card>
</template>

<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faLockOpen from '@fortawesome/fontawesome-free-solid/faLockOpen'
import faLock from '@fortawesome/fontawesome-free-solid/faLock'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

export default {
  name: 'analogs',
  data () {
    return {
      department: 'Краски',
      model: 0,
      types: {
        0: ['число', 'primary', 0],
        1: ['текст', 'warning', 0],
        2: ['число', 'primary', 1],
        3: ['текст', 'secondary', 1]
      },
      attributes: [
        {code: 'ATT_102030', name: 'Цвет ручки', type: 3, groups: [], show_settings: false},
        {code: 'ATT_483764', name: 'Ширина', type: 0, groups: [], show_settings: false},
        {code: 'ATT_483764', name: 'Количество скоростей', type: 2, groups: [], show_settings: false},
        {code: 'ATT_198002', name: 'Комплектация', type: 1, groups: [], show_settings: false}
      ],
      departments: [
        { value: '', text: '--' },
        { value: 'Стройматериалы', text: '01' },
        { value: 'Столярные изделия', text: '02' },
        { value: 'Электротовары', text: '03' },
        { value: 'Инструменты', text: '04' },
        { value: 'Напольные покрытия', text: '05' },
        { value: 'Плитка', text: '06' },
        { value: 'Сантехника', text: '07' },
        { value: 'Водоснабжение', text: '08' },
        { value: 'Сад', text: '09' },
        { value: 'Скобяные изделия', text: '10' },
        { value: 'Краски', text: '11' },
        { value: 'Декор', text: '12' },
        { value: 'Освещение', text: '13' },
        { value: 'Хранение', text: '14' },
        { value: 'Кухни', text: '15' }
      ],
      models: [
        {value: '0', text: 'MOD_200767 - Краска для мебели'},
        {value: '1', text: 'MOD_200768 - Монтажная пена'},
        {value: '2', text: 'MOD_200769 - Краска для стен и потолков'},
        {value: '3', text: 'MOD_200770 - Эмали универсальные'},
        {value: '4', text: 'MOD_200771 - Кисточки'},
        {value: '5', text: 'MOD_200772 - Бюгели и валики'},
        {value: '6', text: 'MOD_200773 - Ведра'},
        {value: '7', text: 'MOD_200774 - Клей монтажный'}
      ]
    }
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  },
  computed: {
    icons () {
      return [faLockOpen, faLock]
    },
    faTrash () {
      return faTrash
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped>

</style>
