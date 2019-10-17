<template>
<section id="error-del">
  <el-button @click="requestError">click</el-button>
</section>
</template>

<script>
  export default {
    name: "error",
    data () {},
    mounted () {
      // this.requestError();
    },
    methods: {
      requestError () {
        this.$http.get('/err').then(response => {
          console.log('response', response);
        }).catch(error => {
          console.log('error', error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
