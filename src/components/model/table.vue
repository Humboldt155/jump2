<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage"></b-pagination>
      </b-col>
      <b-col cols="4">
        <b-form-group horizontal label="На странице: " :label-cols="4">
          <b-form-select :options="pageOptions" v-model="perPage" ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <download-excel
          class   = "btn btn-default"
          :data   = "products"
          :fields = "columns"
          :name    = "file_name">
          <b-button size="sm" variant="info">
            Download EXCEL
          </b-button>
        </download-excel>
      </b-col>
              <b-link target="_blank" href="https://leroymerlin.ru/catalogue/search/?q=16734800">Link</b-link>

    </b-row>

    <b-table
      bordered
      responsive
      hover
      small
      :items="products"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template slot="ATT_01022 - Описание" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="outline-secondary">
          описание {{ row.detailsShowing ? '-' : '+'}}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card title="Описание:" tag="article" style="max-width: 40rem" class="mb-2">
          <p class="card-text">{{ row.item['ATT_01022 - Описание'] }}</p>
        </b-card>
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      currentPage: 1,
      perPage: 10,
      pageOptions: [ 10, 25, 50, 100, 500 ]
    }
  },
  methods: {
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    totalRows () {
      return this.$store.getters.products.length
    },
    modelId () {
      return this.$store.getters.modelId
    },
    fields () {
      return this.$store.getters.fields
    },
    columns () {
      return this.$store.getters.columns
    },
    file_name () {
      let model = this.$store.getters.modelAdeo
      return model.russian_name.concat('.xls')
    }
  }
}
</script>

<style scoped>

</style>
