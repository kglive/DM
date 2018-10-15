/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/9
  * Time: 22:54
  * 测试 vuex
  */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 数据
const state = {
  age: 18,
  name: 'yk',
  grade: [
    {
      name: '张三',
      num: 45
    },{
      name: '李四',
      num: 79
    }
  ]
};

// 操作 state 里面的数据
const mutations = {
  addage () {
    state.age++
  },
  minusAge () {
    state.age--
  }
};

// 来调用mutations里面的方法
// 进行异步操作
const actions = {
  addagepro ({commit}) {
    // 先做其他操作再commit
    commit('addage');
  }
};

// 相当于 computed 作用于 state 过滤操作
const getters = {
  guolv (state) {
    return state.grade.filter(item => {
      return (item.num >= 60) ? true : false;
    });
  }
};

export default new Vuex.Store({
  // 用来保存数据
  state,
  mutations,
  actions,
  getters
});
