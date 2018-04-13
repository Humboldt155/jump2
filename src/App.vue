<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#/">Jump</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#/model">Модель</b-nav-item>
          <b-nav-item href="#/product">Поиск артикула</b-nav-item>
          <b-nav-item href="#/models-list">Список моделей</b-nav-item>
          <b-nav-item href="#/family">Семьи</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#/step">STEP</b-nav-item>
          <b-nav-item href="#/opusdb">Все данные</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view></router-view>

  </div>
</template>

<script>

</script>
