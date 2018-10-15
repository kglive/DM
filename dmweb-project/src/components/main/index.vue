<template>
<section id="main-index">
  主页
  <el-upload
    class="avatar-uploader"
    action=""
    :multiple="false"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="handleAvatarChange">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon">单图</i>
  </el-upload>
  <!--<el-upload-->
    <!--class="avatar-uploader"-->
    <!--list-type="picture-card"-->
    <!--action=""-->
    <!--:multiple="true"-->
    <!--:auto-upload="false"-->
    <!--:on-change="handleAvatarChangeMore">-->
    <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
    <!--<i v-else class="el-icon-plus avatar-uploader-icon">多图</i>-->
  <!--</el-upload>-->
  <el-upload
    class="avatar-uploader"
    action=""
    :multiple="true"
    :auto-upload="false"
    :file-list="fileList2"
    :on-change="handleAvatarChangeMore"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <el-button @click="submitUpload">upload1</el-button>
  <el-button @click="submitUploadMore">upload2</el-button>
  <hr>
  <div style="width: 56px;">

  </div>
</section>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      avatar: null,
      fileList2: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      fileList: []
    }
  },
  methods: {
    submitUpload () {
      if (this.avatar) {
        let formData = new FormData();
        formData.append(this.Const.onlyOneFileField, this.avatar);
        let config = {headers: {'Content-Type': 'multipart/form-data'}};
        this.$http.post('/api/gravatar', formData, config).then(response => {
          console.log('gravatar', response);
        }).catch(error => {
          console.log(error);
        });
      }
    },
    handleAvatarChange (file, fileList) {
      console.log(file, fileList);
      let acceptTypeArr = ['image/jpeg', 'image/png', 'image/jpg'];
      const isJPG = acceptTypeArr.includes(file.raw.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG|Png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if (isJPG && isLt2M) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.avatar = file.raw;
      }
      return isJPG && isLt2M;
    },
    handleAvatarChangeMore (file, fileList) {
      console.log(file, fileList);
      this.fileList.push(file.raw);
    },
    submitUploadMore () {
      if (this.fileList.length) {
        let formData = new FormData();
        for (let i = 0; i < this.fileList.length; i++) {
          formData.append(this.Const.moreFileField, this.fileList[i]);
        }
        let config = {headers: {'Content-Type': 'multipart/form-data'}};
        this.$http.post('/api/gallery', formData, config).then(response => {
          console.log('gravatarMore', response);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
