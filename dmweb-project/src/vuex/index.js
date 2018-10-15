/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/9
  * Time: 15:14
  * vuex 组装模块并导出 store
  */

import Vue from 'vue';
import Vuex from 'vuex';
// Vuex 自带一个日志插件用于一般的调试 此插件应该只在开发阶段使用
import createLogger from 'vuex/dist/logger';
import rollcall from './modules/rollcall';
import classroom from './modules/classroom'

Vue.use(Vuex);

// 判断发布阶段
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    rollcall,
    classroom
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
