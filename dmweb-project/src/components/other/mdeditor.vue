<template>
  <section id="md-editor">
    <mavon-editor
      ref="mdeditor"
      v-model="content"
      @save="save"
      @imgAdd="handleAddimg"></mavon-editor>
    <div class="preview" ref="preview"></div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        content: '',
        toolbars: {
          navigation: true, // 导航目录
        }
      }
    },
    methods: {
      handleAddimg (filename, imgfile) {
        console.log('Addimg', filename, imgfile);
        let formdata = new FormData();
        formdata.append(this.Const.onlyOneFileField, imgfile);
        let config = { headers: { 'Content-Type': 'multipart/form-data' } };
        this.$http.post('/api/gravatar', formdata, config).then(response => {
          // 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
          // $vm.$img2Url(pos, url);
          console.log(response);
          let resData = response.data;
          if (resData.status == 0) {
            let $mdEditor = this.$refs['mdeditor'];
            console.log('$mdEditor', $mdEditor, resData.data.url);
            $mdEditor.$img2Url(filename, resData.data.url);
          } else {
            this.$message({type: 'info', message: resData.message || '图片上传失败，请重试：'});
          }
        }).catch(error => {
          console.error(error);
          this.$message({type: 'error', message: '图片上传失败，请重试：'+error.message});
        });
      },
      save (value, render) {
        console.log('save', value, render);
        this.$refs['preview'].innerHTML = render;
      }
    }
  }
</script>

<style scoped>

</style>
