/**
 * 问1：输出什么？为什么？
 * 问2：new是怎么实现的？
 */

Function.prototype.a = function () {
  console.log(1);
};
Object.prototype.b = function () {
  console.log(1);
};
function A() {}
// let a = new A();
let a = newFactory(A);
a.a();
a.b();

function newFactory() {
  let obj = new Object(),
    constructor = [].shift.call(arguments);
  // 1
  obj.__proto__ = constructor.prototype;
  // 2
  constructor.apply(obj, arguments);
  return obj;
}
/**
 * 问题1：setData1/setData2 执行会不会渲染
 * 问题2：为什么 vue不能检测数组如下的变化
 */

export default {
  data() {
    return { list: ["1", "2", "3"] };
  },
  methods: {
    setData1() {
      this.list[0] = "test";
    },
    setData2() {
      this.list.push("test1");
    },
  },
};
/**
 *
 */
