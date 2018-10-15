<template>
  <div id="app">
    <router-view :key="key" name="login"></router-view>
    <router-view name="index"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    computed: {
      key () {
        return (this.$route.name !== undefined) ? this.$route.name + new Date() : this.$route + new Date();
      }
    }
  }
</script>

<style lang="scss">
  html,body,#app{
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    #side-nav {
      position: fixed;
      left: 0;
      width: 210px;
      height: 100vh;
      overflow-y: auto;
      background-color: #545c64;
      &::-webkit-scrollbar {
        width: 5px;
        height: 100%;
        border-radius: 2px;
        background: #424448;
      }
      &::-webkit-scrollbar-thumb {
        background: #a2a2a2;
        border-radius: 2px;
      }
    }
    #main {
      margin-left: 210px;
      background: #ccd3dd;
      padding: 5px;
      box-sizing: border-box;
      height: 100vh;
    }

  }
</style>
