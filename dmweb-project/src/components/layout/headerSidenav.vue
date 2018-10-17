<template>
  <section>
    <aside id="side-nav">
      <div class="sidenav-con">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" background-color="rgb(84, 92, 100)" text-color="#fff" :active-text-color="activeTextColor">
          <template v-for="item in sideNavList">
            <el-menu-item v-if="!item.menu" @click="handleSideSkip(item.id, item.url)" :index="item.id" :title="item.name" ><i :class="item.icon"></i>{{item.name}}</el-menu-item>
            <el-submenu v-else :index="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item @click="handleSideSkip(item1.id, item1.url)" v-for="(item1, index1) in item.menu" :key="index1" :index="item1.id">{{ item1.name }}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
    </aside>
    <section id="main">
      <div id="header">
        <el-menu :unique-opened="true" class="el-menu-demo" mode="horizontal"
          @select="handleSelect" background-color="rgb(241,246,253)" text-color="rgb(84, 92, 100)" :active-text-color="activeTextColor">
          <el-menu-item index="1">
            <el-color-picker @change="colorChange" v-model="activeTextColor" show-alpha size="small" @active-change="activeColorChange"></el-color-picker>
          </el-menu-item>
          <template v-for="item in topNavList">
            <el-submenu v-if="item.menu.length" :index="item.id">
              <template slot="title" :title="item.name"><i :class="item.icon"></i></template>
              <el-menu-item v-for="(item2, index2) in item.menu" :key="index2" :index="item2.id" @click="handleTopSkip(item2.code, item2.url)">{{ item2.name }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.id" :title="item.name"><i :class="item.icon"></i></el-menu-item>
          </template>
        </el-menu>
      </div>
      <section id="content">
        <router-view :key="key"></router-view>
      </section>
    </section>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '0',
        activeTextColor: '#ffd04b',
        sideNavList: [
          {
            id: '0',
            name: '首页',
            code: 'indexmain',
            url: '/index',
            icon: 'el-icon-menu'
          },
          {
            id: '1',
            name: '课堂',
            code: 'classroom',
            icon: 'el-icon-location',
            menu: [
              {
                id: '1.1',
                name: '考勤',
                code: 'dianmin',
                url: '/index/dianming'
              },{
                id: '1.2',
                name: '班级',
                code: 'class',
                url: '/index/classes'
              },{
                id: '1.3',
                name: '辅导员',
                code: 'counsellor',
                url: '/index/counsellor'
              },{
                id: '1.4',
                name: '课堂',
                code: 'classroom',
                url: '/index/classroom'
              }
            ]
          },
          {
            id: '9',
            name: 'other',
            code: 'other',
            icon: 'el-icon-location',
            menu: [
              {
                id: '9.1',
                name: 'AcgClud',
                code: 'acgclud',
                url: '/index/acgclud'
              },{
                id: '9.2',
                name: 'Markdown',
                code: 'mdeditor',
                url: '/index/mdeditor'
              }
            ]
          }
        ],
        topNavList: [
          {
            id: '1',
            name: '个人中心',
            code: 'usercenter',
            icon: 'el-icon-setting',
            menu: [
              {
                id: '1.1',
                name: '退出',
                code: 'logout',
                url: '/'
              }, {
                id: '1.2',
                name: '个人信息',
                code: 'usermsg',
                url: '/index/usermsg'
              }
            ]
          },{
            id: '2',
            name: '消息中心',
            code: 'news',
            icon: 'el-icon-bell',
            menu: []
          },{
            id: '3',
            name: '工作台',
            code: 'worktop',
            icon: 'el-icon-edit-outline',
            menu: []
          }
        ]
      }
    },
    mounted () {
      let sideActiveIndex = window.sessionStorage.getItem('sideActiveIndex');
      let sideActiveUrl = window.sessionStorage.getItem('sideActiveUrl');
      this.activeIndex = sideActiveIndex ? sideActiveIndex : '0';
      let url = sideActiveUrl ? sideActiveUrl : '/index';
      this.$router.push(url);
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      activeColorChange (color) {
        console.log('1', color);
      },
      colorChange (color) { this.activeTextColor = color; },
      // 跳转
      handleSideSkip (index, url) {
        window.sessionStorage.setItem('sideActiveIndex', index);
        window.sessionStorage.setItem('sideActiveUrl', url);
        this.$router.push(url);
      },
      // 顶部跳转
      handleTopSkip (code, url) {
        if (code == 'logout') {
          window.localStorage.setItem('token', '');
          this.$router.push(url);
        }
      }
    },
    computed: {
      key () {
        return (this.$route.name !== undefined) ? this.$route.name + new Date() : this.$route + new Date();
      }
    }
  }
</script>

<style scoped lang="scss">
  #header {
    height: 60px;
    line-height: 60px;
    .el-menu--horizontal{
      .el-menu-item, .el-submenu{
        float: right;
      }
    }
  }
  .sidenav-con {
    text-align: left;
    height: 100%;
    .el-menu {
      height: 100%;
    }
    .el-submenu .el-menu-item {
      padding: 0 0 0 55px !important;
      border-right: 2px solid transparent;
      &:hover, &.is-active {
        border-right-color: rgb(255, 208, 75);
      }
    }
  }
</style>
