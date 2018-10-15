/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/9
  * Time: 22:50
  * vuex 点名模块
  */

const state = {
  nopasslist: [
    {
      id: '1231823',
      code: '1768364922',
      name: '张三',
      reason: '缺席'
    }
  ],
  // 原因
  reasonList: [
    {
      id: 0,
      name: '正常'
    },{
      id: 1,
      name: '迟到'
    },{
      id: 2,
      name: '早退'
    },{
      id: 3,
      name: '旷课'
    },{
      id: 4,
      name: '请假'
    },{
      id: 5,
      name: '课堂奖励'
    },{
      id: 6,
      name: '课堂惩罚'
    },{
      id: 7,
      name: '其他'
    }
  ],
  // 当前点名的课堂的数据
  classroom: {
    // 点名的课堂的所有的班级列表
    classesList: [
      {
        id: 'e423',
        name: '班级1',
        code: '169437234'
      },{
        id: 'e42233',
        name: '班级1',
        code: '169437234'
      }
    ],
    // 点名的课堂的所有的老师列表
    teacherList: [
      {
        id: 'e42563',
        name: '老师',
        code: 'T1842'
      }
    ],
    // 点名的课堂的学生列表
    numberList: [
      {
        id: '3435',
        classid: 'e423',
        name: '张三',
        code: '182478124'
      },{
        id: '34gt35',
        classid: 'e42233',
        name: '李四',
        code: '187878124'
      }
    ]
  }
};


const getters = {

};


const actions = {

};


const mutations = {
  setClassroom (state, newClassroom) {
    // TODO
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
