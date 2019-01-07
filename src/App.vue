<template>
  <div class="app" id="app">
    <v-header></v-header>
    <header-tabs></header-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vHeader from './components/header'
  import headerTabs from './components/headerTabs'

  export default {
    components: {
      vHeader,
      headerTabs
    }
  }
</script>
