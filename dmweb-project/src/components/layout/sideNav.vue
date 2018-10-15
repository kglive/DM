<template>
  <div class="sidenav-con">
    <!-- <ul class="dm-menu">
      <li class="dm-submenu">
        <div class="dm-submenu__title">
          <i class="dm-tubiao el-icon-location"></i>
          <span>导航一</span>
          <i class="dm-submenu__icon-arrow el-icon-arrow-down"></i>
        </div>
        <ul class="dm-menu dm-menu--inline">
          <li class="dm-menu-item">选项1</li>
          <li class="dm-menu-item">选项2</li>
        </ul>
      </li>
      <li class="dm-submenu">
        <div class="dm-submenu__title">
          <i class="dm-tubiao el-icon-location"></i>
          <span>导航一</span>
          <i class="dm-submenu__icon-arrow el-icon-arrow-down"></i>
        </div>
        <ul class="dm-menu dm-menu--inline">
          <li class="dm-menu-item">选项1</li>
          <li class="dm-menu-item">选项2</li>
        </ul>
      </li>
    </ul>-->
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-time"></i>
          <span>导航二</span>
        </template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .sidenav-con {
    text-align: left;
    /* color: #fff;
    .dm-submenu__title {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      padding: 0 20px;
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color .3s, background-color .3s, color .3s;
      box-sizing: border-box;
      white-space: nowrap;
      text-align: left;
      &:hover {
        background-color: rgb(67, 74, 80);
      }
      .dm-submenu__icon-arrow {
        position: absolute;
        top: 50%;
        right: 14px;
        margin-top: -7px;
        font-size: 12px;
      }
      .dm-tubiao {
        font-size: 14px;
      }
      span {
        margin-left: 10px;
      }
    }
    .dm-submenu .dm-menu-item {
      height: 50px;
      line-height: 50px;
      padding: 0 40px 0 55px;
      min-width: 200px;
      font-size: 14px;
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color .3s, background-color .3s, color .3s;
      box-sizing: border-box;
      white-space: nowrap;
      text-align: left;
      &:hover {
        background-color: rgb(67, 74, 80);
      }
    } */
    .el-submenu .el-menu-item {
      padding: 0 0 0 55px !important;
      border-right: 2px solid transparent;
      &:hover, &.is-active {
        border-right-color: rgb(255, 208, 75);
      }
    }
  }
</style>
