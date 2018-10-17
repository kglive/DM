// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './vuex/index';
import config from './config/config';
// elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// mavon-editor Markdown
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(ElementUI);
Vue.use(mavonEditor);
axios.defaults.timeout = config.requestTimeout;
axios.defaults.baseURL = config.requestUrl;

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log('request interceptors');
  config.headers['Authorization'] = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  // console.log('response interceptors', response);
  if (response.data.status == 401) {
    router.push({path: '/', name: 'login'});
    return false;
    /*ElementUI.$message({
      type: 'error',
      message: response.data.message ? response.data.message : '登录用户身份失效！',
      onClose () {
        router.push({path: '/', name: 'login'});
      }
    });*/
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
Vue.prototype.$http = axios;


// 全局常量
Vue.prototype.Const = {
  onlyOneFileField: config.onlyOneFileField,
  moreFileField: config.moreFileField
};



Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

// 公共样式
import './style/common/reset.css'
import './style/common/common.css'
