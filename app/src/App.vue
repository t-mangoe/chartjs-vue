<template>
  <v-app>
    <div id="app">
      <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <!-- <AssetChart></AssetChart> -->
      <router-view />
    </div>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import AssetChart from "./components/AssetChart.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
    // AssetChart,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
