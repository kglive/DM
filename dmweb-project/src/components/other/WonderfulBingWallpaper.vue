<template>
  <div id="wonderfulBingWallpaper">
    <div class="wrapper" v-if="imgStory && wallpaperJSON">
      <img :src="wallpaperJSON.defaultUrl" :alt="wallpaperJSON.copyright">
      <div class="mark">
        <h2 class="title">{{ imgStory.title }}</h2>
        <p class="subb-title">{{ wallpaperJSON.copyright }}</p>
        <p class="img-story">{{ imgStory.para1 }}</p>
        <div class="opera">
          <span class="addr" :title="imgStory.CityInEnglish"><i class="el-icon-location"></i> {{ imgStory.attribute }} | {{ imgStory.Continent }}</span>
          <span class="link"><a target="_blank" :href="wallpaperJSON.copyrightlink"><i class="el-icon-search"></i> Bing Search</a></span>
          <span class="download"><a :href="imgStory.imageUrl" download><i class="el-icon-download"></i> Save</a></span>
          <span class="date"><i class="el-icon-date"></i> {{ imgStory.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // const WonderfulBingWallpaper = require('wonderful-bing-wallpaper');
  export default {
    name: "WonderfulBingWallpaper",
    data () {
      return {
        imgStory: null,
        wallpaperJSON: null
      }
    },
    mounted () {
      this.requestBingPaper();
    },
    methods: {
      requestBingPaper () {
        this.$http.get('/req/bingWallpaper', {}).then(response => {
          console.log('response', response);
          let resData = response.data;
          if (resData.status === 0) {
            this.imgStory = resData.data.story;
            this.wallpaperJSON = resData.data.wallpaperJSON;
          }
        }).catch(error => {
          this.$message({type: 'error', message: '获取必应壁纸失败！'+error});
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 900px;
  margin: 40px auto;
  overflow-y: auto;
  img {
    width: 100%;
    height: auto;
  }
  .mark {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(125,125,125,.5);
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #ddd;
    & > * {
      margin-bottom: 20px;
    }
    p{
      line-height: 20px;
      letter-spacing: 1px;
    }
    .opera {
      span{
        padding: 10px;
        float: left;
        background-color: rgba(125,125,125,.7);
        color: #eee;
        text-align: center;
        font-size: 12px;
        margin-right: 10px;
        a {
          color: #eee;
        }
      }
    }
  }
}
</style>
