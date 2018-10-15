/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/10
  * Time: 23:19
  * 工具函数集
  */

const tools = {
  /*
  * 平铺多维数组
  * params Array
  * return Array() 一维数组
  * */
  flattenArr (arr) {
    // 平铺二维数组
    const flattened = [].concat(...arr);
    // 迭代平铺多维
    return flattened.some(item => Array.isArray(item)) ? flattenArr(flattened) : flattened;
  },
  /*
  * 数组去重
  * params Array
  * return Array
  * */
  uniqueArr (arr) {
    return Array.from(new Set(arr));
  }
};

module.exports = tools;