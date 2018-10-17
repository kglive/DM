/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/16
  * Time: 0:55
  * 前端工具函数集
  */

const tools = {
  /*
  * 乱序数组
  * params Array
  * return Array
  * */
  shuffle (arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      let index = parseInt(Math.random() * (len - i));
      let temp = arr[index];
      arr[index] = arr[len - i - 1];
      arr[len - i - 1] = temp;
    }
    return arr;
  },
  /*
  * 格式化当前日期
  * return 2018-09-09
  * */
  getNowFormatDate () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    return date.getFullYear().toString() +'-'+ month.toString() +'-'+ strDate.toString();
  }
};

module.exports = tools;

