import Vue from 'vue'
import Router from 'vue-router'

/*
* 登录注册
* */
import login from '@/components/login/login';

/*
* 课堂路由
* */
import dianming from '@/components/classroom/index';
import classes from '@/components/classroom/classes';
import counsellor from '@/components/classroom/counsellor';
import classroom from '@/components/classroom/classroom';


/* 主页路由 */
import dmHeaderSidenav from '@/components/layout/headerSidenav';
import mainindex from '@/components/main/index';


/*
* other 模块路由
* */
import acgclud from '@/components/other/acgclud';
import mdeditor from '@/components/other/mdeditor';


Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', components: {login: login} },
    { path: '/index', components: {index: dmHeaderSidenav},
      children: [
        { path: '', redirect: 'main' },
        { path: 'main', name: 'main', component: mainindex },
        { path: 'dianming', name: 'dianming', component: dianming },
        { path: 'classes', name: 'classes', component: classes },
        { path: 'counsellor', name: 'counsellor', component: counsellor },
        { path: 'classroom', name: 'classroom', component: classroom },
        /*
        * other 模块路由
        * */
        { path: 'acgclud', name: 'acgclud', component: acgclud },
        { path: 'mdeditor', name: 'mdeditor', component: mdeditor },
      ]
    }
  ]
});
