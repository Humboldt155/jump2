<template>
    <b-card title="Настройка аналогов">
      <b-container fluid>
        <!--Панель выбора-->
        <b-row>
          <b-col>
            Отдел: <strong>{{ selected }}</strong>
            <br>
            <br>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2">
            <b-form-select v-model="selected" :options="options" class="mb-3" size="sm"></b-form-select>
          </b-col>
          <b-col cols="1">
            <b-btn size="sm"> &#8195;&laquo;&#8195; </b-btn>
          </b-col>
          <b-col>
            <b-form-select v-model="selected" :options="options" class="mb-3" size="sm"></b-form-select>
          </b-col>
          <b-col cols="1">
            <b-btn size="sm">&#8195;&raquo;&#8195;</b-btn>
          </b-col>
        </b-row>

        <!--Атрибуты-->
        <br>
        Атрибуты
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
                    <b-col cols="3">
                      <b-badge pill :variant="types[att.type][1]">{{ types[att.type][0] }}</b-badge>
                    </b-col>

                    <!--Настройк, кнопка-->
                    <b-col cols="2">
                      <b-btn @click="att.show_settings = !att.show_settings"
                             size="sm" variant="outline-info">Настроить</b-btn>
                    </b-col>
                  </b-row>
                  <!--Настройка атрибута-->
                  <b-row>
                    <b-col v-if="att.show_settings">
                      Настроить
                    </b-col>
                    <b-row v-else>
                    </b-row>
                  </b-row>

                </b-container>
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
export default {
  name: 'analogs',
  data () {
    return {
      selected: null,
      types: {
        0: ['открытый, числовой', 'primary'],
        1: ['открытый, текстовый', 'warning'],
        2: ['закрытый, числовой', 'info'],
        3: ['закрытый, текстовый', 'secondary']
      },
      attributes: [
        {code: 'ATT_102030', name: 'Цвет ручки', type: 3, groups: [], show_settings: false},
        {code: 'ATT_483764', name: 'Ширина', type: 0, groups: [], show_settings: false},
        {code: 'ATT_483764', name: 'Количество скоростей', type: 2, groups: [], show_settings: false},
        {code: 'ATT_198002', name: 'Комплектация', type: 1, groups: [], show_settings: false}
      ],
      options: [
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
      ]
    }
  },
  mounted () {
    this.$store.dispatch('setAllModels')
  }
}
</script>

<style scoped>

</style>
