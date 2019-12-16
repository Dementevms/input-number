<template>
  <div id="app">
    <Controls />
  </div>
</template>

<script>
import Controls from "./components/Controls.vue";

export default {
  name: "app",
  components: {
    Controls
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
