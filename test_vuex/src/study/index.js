/**
 * 输入：[['a', 'b'], ['n', 'm'], ['0', '1']]
 * 输出：["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]
 */
function test(arr) {
  let map = {},
    len = arr.length; // 0:[a,b],1:[n,m]
  let code = ""; // 000 + 001 + 002 +...+ 222
  let result = [];
  for (let i = 0; i < len; i++) {
    let item = arr[i]; // [a,b]
    // let rItem = "";
    map[i] = item;
    // for (let j = 0; j < item.length; j++) {
    //   rItem += arr[i][j] + arr[i + 1][j] + arr[i + 2][j];
    // }
    code += "0";
    // result.push(rItem);
  }
  while (code) {
    // value =[a,b]
    let rItem = "";
    for (let index in code) {
      // map[value][0]+map[value][1] +
      rItem += map[value][code[index]];
    }
    map[value]; // [a,b]
    map[value] + map[value + 1] + map[value++];
    result.push(rItem);
  }
  return result;
}
// 发布者模式
class eventEmitter {
  constructor() {
    this.list = {};
  }
  // 发布
  publish(name) {
    this.list[name].forEach((cb) => {
      cb();
    });
  }
  // 订阅
  handler(name, cb) {
    if (!this.list[name]) {
      this.list[name] = [];
    }
    this.list[name].push(cb);
  }
  // 取消订阅
  remove(name, cb) {
    if (this.list[name]) {
      this.list[name].some((item, index) => {
        if (item === cb) {
          this.list[name].splice(index);
          return;
        }
      });
    }
  }
}
