
<template>
  <div>
    <b-button variant="light">
      <b-badge variant="primary">{{item.model_group_adeo.slice(4,6)}}</b-badge>
      <b-badge variant="info">{{item.id}}</b-badge>
      {{ item.russian_name }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>
