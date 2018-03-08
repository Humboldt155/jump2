<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#/">Jump</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#/model">Model</b-nav-item>
          <b-nav-item href="#/models-list">Models List</b-nav-item>
          <b-nav-item href="#/product">Product</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
