/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/9
  * Time: 23:38
  * classroom 模块 vuex
  * 所有班级，所有老师，所有课堂
  */

const state = {
  // 所有老师列表
  allTeacherList: [],
  // 所有班级列表
  allClassesList: []
};

const getters = {

};

const actions = {};

const mutations = {
  setTeacherList (state, newTeacherList) {
    state.allTeacherList = newTeacherList;
  },
  setClassesList (state, newClassList) {
    state.allClassesList = newClassList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
