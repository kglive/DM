<template>
  <section id="acgclub">
    <div class="search-tools">
      <div class="tool-item">
        <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search.con"></el-input>
      </div>
      <div class="tool-item">
        <el-select size="small" v-model="search.type" placeholder="请选择壁纸类别">
          <el-option v-for="item in acgclubType" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="tool-item">
        <el-button type="success" @click="requestAcgclub" size="small" icon="el-icon-search"></el-button>
      </div>
    </div>
    <div class="acgclub-wrap">
      <div class="pictures-list">
        <div v-for="(item, index) in acgclubList" :key="index" class="pic-item">
          <a href="javascript:void(0);" @click="handelShowImgs(item.imgUrls, item.title)"><img :src="item.thumbnail" :alt="item.title" :title="item.title"></a>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :page-sizes="[20, 30, 40, 50, 60]"
        :page-size="page.pageSize"
        background
        layout="sizes, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <!--浏览系列图片的弹窗-->
    <el-dialog id="showpin-dialog" :close-on-click-modal="false" :title="showpicdialog.title" :visible.sync="showpicdialog.showpicdialogTableVisible" width="70%">
      <el-carousel height="400px" :autoplay="false" indicator-position="none" :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in showpicdialog.imgsList" :key="index">
          <a :href="item" target="_blank"><img :src="item" alt=""></a>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        page: {
          currentPage: 1,
          pageSize: 20
        },
        search: {
          con: '',
          type: ''
        },
        acgclubType: [
          {
            value: 'moeimg',
            name: 'moeimg'
          },{
            value: 'cosplay',
            name: 'cosplay'
          },{
            value: 'gamersky',
            name: 'gamersky'
          }
        ],
        acgclubList: [],
        showpicdialog: {
          title: '系列图片',
          showpicdialogTableVisible: false,
          imgsList: []
        }
      }
    },
    mounted () {
      this.requestAcgclub();
    },
    methods: {
      requestAcgclub () {
        let url = 'https://rabtman.com/api/v2/acgclub/pictures';
        if (this.search.type) {
          url = `https://rabtman.com/api/v2/acgclub/category/${this.search.type}/pictures`;
        }
        this.$http.get(url, {
          params: {
            offset: this.page.currentPage,
            limit: this.page.pageSize,
            query: this.search.con
          }
        }).then(response => {
          console.log(response);
          if (response.status == 200) {
            this.acgclubList = response.data.data;
          } else {
            this.$message({type: 'warning', message: ''});
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.message});
        });
      },
      handleSizeChange (val) {
        this.page.pageSize = val;
        this.requestAcgclub();
      },
      handleCurrentChange (val) {
        this.page.currentPage = val;
        this.requestAcgclub();
      },
      handelShowImgs (imgs, title) {
        this.showpicdialog.title = title;
        this.showpicdialog.imgsList = imgs;
        this.showpicdialog.showpicdialogTableVisible = true;
      }
    }
  }
</script>

<style lang="scss">
#acgclub {
  .pictures-list {
    display: flex;
    flex-wrap: wrap;
    &::after{
      content: '';
      flex-grow: 999999999;
    }
    .pic-item {
      flex-grow: 1;
      height: 200px;
      margin: 5px;
      img {
        height: 200px;
        min-width: 100%;
        max-width: 100%;
        vertical-align: bottom;
        object-fit: cover;
      }
    }
  }
  #showpin-dialog {
    .el-dialog {
      margin-top: 10px;
      .el-carousel {
        .el-carousel__item {
          text-align: center;
          img {
            height: 400px;
          }
        }
      }
    }
  }
}
</style>
