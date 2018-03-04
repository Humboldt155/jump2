<template>
  <b-container fluid>
    <download-excel
      class   = "btn btn-default"
      :data   = "products"
      :fields = "columns"
      :name    = "file_name">
      <b-button size="sm" class="mr-2" variant="success">
        Download EXCEL
      </b-button>
    </download-excel>

    <b-table
      bordered
      responsive
      hover
      small
      :items="products"
      :fields="fields"
    >
      <template slot="ATT_01022 - Описание" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="outline-secondary">
          описание {{ row.detailsShowing ? '-' : '+'}}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card title="Описание:" tag="article" style="max-width: 40rem" class="mb-2">
          <p class="card-text">{{ row.item['Описание'] }}</p>
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
    }
  },
  computed: {
    products () {
      return this.$store.getters.products
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
