// 射击员每次射击是 0-10环, 求他他连续射击10次, 总环是90的种类

// let A = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("A-");
//   }, 2000);
// });
// let B = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("B-");
//   }, 2000);
// });
// let C = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("C");
//   }, 2000);
// });
// waterflow(A, B, C);
// function waterflow(...args) {
//   return new Promise((resolve, reject) => {
//     let tasks = Array.isArray(args) ? args : [args];
//     if (tasks.length === 0) return "res";
//     let now = tasks.shift();
//     // TODO 非promise判断
//     now.then((res) => {
//       resolve(res);
//       console.log(res);
//       waterflow(...tasks);
//     });
//   });
// }

// 1 2 4 10 12 5 3 11 6 8 7 9
// console.log("1"); // 1
// async function async1() {
//   console.log("2"); // 2
//   await async2();
//   console.log("3"); // 4
// }
// async function async2() {
//   console.log("4"); // 3
// }

// process.nextTick(function () {
//   console.log("5"); // 7
// });

// setTimeout(function () {
//   console.log("6"); // 9
//   process.nextTick(function () {
//     console.log("7"); // 11
//   });
//   new Promise(function (resolve) {
//     console.log("8"); // 10
//     resolve();
//   }).then(function () {
//     console.log("9"); //12
//   });
// });

// async1();

// new Promise(function (resolve) {
//   console.log("10"); // 5
//   resolve();
// }).then(function () {
//   console.log("11"); //8
// });
// console.log("12"); // 6

// schedule.add(asyncFacotory(5, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });
// schedule.add(asyncFacotory(6, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });

/**
 * DONE
 * 求两个字符串的最长字串
 * let str1 = "ximqakjis1"
 * let str2 = "iiikjis1ximqa"
 * test(str1,str2)
 * 思路：dp数组解决
 */
// function test(str1, str2) {
//   let result = "",
//     len1 = str1.length,
//     len2 = str2.length;
//   let dp = Array.from({ length: len1 + 1 }, () => {
//     return Array.from({ length: len2 + 1 }, () => {
//       return "";
//     });
//   });
//   for (let i = 0; i < len1; i++) {
//     for (let j = 0; j < len2; j++) {
//       if (str1[i] === str2[j]) {
//         dp[i + 1][j + 1] = dp[i][j] + str1[i];
//         if (result.length < dp[i + 1][j + 1].length) {
//           result = dp[i + 1][j + 1];
//         }
//       }
//     }
//   }
//   console.log(dp);

//   return result;
// }
// let str1 = "xikjiiiii";
// let str2 = "iiiiiikjis1ximqa";
// console.log(test(str1, str2));

/**
 * DONE 有一张圆桌，坐了 2*N 个人
其中，N个男生（B），N个女生（G）
从第1个人开始报数，报到M的那个人，离席。
下一个人继续从1开始报数，报到M的那个人，离席。
... ...
循环往复，游戏进行了N个回合，共有N个人离席。
结果，剩下的N个人全是男生。
输入：N、M
输出：男生和女生的排列

Test Case：
如输入：N=3,M=2

则输出：BGBGBG
 */

// function test(N, M) {
//   let result = Array.from({ length: N }, () => "B"),
//     number = M;
//   for (let i = 0; i <= N; i++) {
//     // 每一轮往里面塞一个G
//     for (let j = 0; j < result.length; j++) {
//       // 报数为number的将被砍掉
//       if (j + 1 === number) {
//         result.splice(j, 0, "G");
//       }
//     }
//     number = M > result.length ? (M * i + 1) % result.length : M * i + 1;
//     // console.log("result-", result, "--", number);
//   }
//   return result.reverse();
// }
// function BG(N, M) {
//   let result = new Array(N).fill("B");
//   result.push("G");
//   let restG = N - 1;
//   let currentIndex = N;
//   while (restG > 0) {
//     let prevIndex = currentIndex - M + 1;
//     while (prevIndex < 0) {
//       prevIndex += result.length;
//     }
//     currentIndex = prevIndex;
//     result.splice(currentIndex, 0, "G");
//     // console.log(currentIndex, result);
//     restG -= 1;
//   }
//   return result;
// }

// console.log("1--", BG(3, 2));
// let r = test(3, 2);
// console.log("2---", r);
// function add1(n) {
//   return n + 1;
// }
// function add2(n) {
//   return n + 2;
// }
// function add3(n) {
//   return n + 3;
// }
// function add4(n) {
//   return n + 4;
// }

// function compose() {
//   let preArgs = [...arguments];
//   return function() {
//     return preArgs.reverse().reduce((acc, x) => x(acc), ...arguments);
//   }
// }

// console.log(compose(add1, add2, add3,add4)(10));;
// 1---函数科里化
// function add(a, b) {
//   return a + b;
// }
// function sub_curry(...args1) {
//   let fn = args1.shift();
//   return function (...args2) {
//     let newArg = args1.concat(args2);
//     return fn.apply(this, newArg);
//   };
// }
// function curry(fn, length) {
//   length = length || fn.length;
//   return function (...args2) {
//     if (args2.length < length) {
//       var combined = [fn].concat(args2);
//       return curry(sub_curry.apply(this, combined), length - args2.length);
//     } else {
//       return fn.apply(this, args2);
//     }
//   };
// }
// console.log(add(2, 3)); // 5
// let curryAdd = curry(add);
// console.log(curryAdd(3)(2));
// let a = curryAdd(2, 3);
// console.log("res--", a);
// 2--- 实现new

// function objectFactory(...args) {
//   let obj = new Object();
//   let Constructor = args.shift();
//   obj.__proto__ = Constructor.prototype;
//   let ret = Constructor.apply(obj, args);
//   return typeof ret === "object" ? ret : obj;
// }

// function Otaku(name, age) {
//   this.name = name;
//   this.age = age;

//   this.habit = "Games";
//   // return {
//   //   name: name,
//   //   habit: "Games",
//   // };
// }

// Otaku.prototype.strength = 60;

// Otaku.prototype.sayYourName = function () {
//   console.log("I am " + this.name);
// };
// // var person = new Otaku("Kevin", "18");
// var person = objectFactory(Otaku, "Kevin", "18");
// console.log(person);
// console.log(person.name); // Kevin
// console.log(person.habit); // Games
// console.log(person.age); // Games
// console.log(person.strength); // 60
// 3 --- 组合继承实现
// function Person(name) {
//   this.name = name;
//   this.colors = ["blue"];
// }
// Person.prototype.getName = function () {
//   console.log(this.name);
//   return this.name;
// };
// function Child(name, age) {
//   this.age = age;
//   Person.call(this, name);
// }
// Child.prototype = new Person();
// Child.prototype.constructor = Child;

// let child1 = new Child("kevin", 18);
// child1.colors.push("red");
// console.log("name-", child1.name); // kevin
// child1.getName(); // kevin
// console.log("age-", child1.age); // 18
// console.log(child1.colors); // ["red", "blue", "green", "black"]
// let child2 = new Child("d", 20);
// console.log(child2.name); // daisy
// child2.getName(); // kevin
// console.log(child2.age); // 20
// console.log(child2.colors); // ["red", "blue", "green"]
// 4 ---- call，apply，bind
// Function.prototype.mycall = function (...args) {
//   let obj = args.shift() || window;
//   obj.fn = this;
//   let result = obj.fn(...args);
//   delete obj.fn;
//   return result;
// };
// Function.prototype.myapply = function (...args) {
//   let obj = args.shift() || window;
//   let newArgs = args[0];
//   obj.fn = this;
//   let result = obj.fn(...newArgs);
//   delete obj.fn;
//   return result;
// };
// Function.prototype.mybind = function (...args1) {
//   let obj = args1.shift(),
//     self = this;
//   let fBound = function (...args2) {
//     //   this instanceof fBound 证明是被new的，不更改this指向，如果不是被new的，更改到obj上
//     return self.apply(this instanceof fBound ? this : obj, [
//       ...args1,
//       ...args2,
//     ]);
//   };
//   return fBound;
// };
// 测试数据：
// let value = 2;
// let obj = { value: 1 };
// function bar(name, age) {
//   console.log(name);
//   console.log(age);
//   console.log(this.value);
//   return {
//     value: this.value,
//     name: name,
//     age: age,
//   };
// }
// console.log(bar.myapply(obj, ["kvein", 18]));
// bar.mycall(null);
// bar.mybind(obj, "kvein", 19)();
// bar.mybind(obj)("kvein", 19);

// function bar(name, age) {
//   this.habit = "shopping";
//   console.log(this.value); // 注意这里的this指向，如果使用new，这里拿不到obj下面的value
//   console.log(name);
//   console.log(age);
// }

// bar.prototype.friend = "kevin";

// var bindFoo = bar.mybind(obj, "daisy");
// bindFoo("18");
// 1;
// daisy;
// 18;
// var obj1 = new bindFoo("18");
// undefined
// daisy
// 18
// console.log(obj1.habit);
// console.log(obj1.friend);
// shopping
// kevin

// 5 ---- Promise.all

// 给你测试数据：
// const p1 = new Promise((resolve, reject) => {
//   resolve("第一个任务");
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("第二个任务");
//   }, 1000);
// });
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("第三个任务");
//   }, 500);
// });
// // allPromise([p1, p2, p3])
// //   .then((res) => {
// //     console.log("---", res);
// //   })
// //   .catch((err) => {
// //     console.log("err--", err);
// //   });
// racePromise([p1, p2, p3])
//   .then((res) => {
//     console.log("---", res);
//   })
//   .catch((err) => {
//     console.log("err--", err);
//   });
// function racePromise(promise) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promise.length; i++) {
//       promise[i]
//         .then((res) => {
//           return resolve(res);
//         })
//         .catch((err) => {
//           return reject(err);
//         });
//     }
//   });
// }

// function allPromise(promise) {
//   let result = [],
//     index = 0;
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promise.length; i++) {
//       console.log(i);
//       promise[i]
//         .then((res) => {
//           console.log(res);
//           result.push(res);
//           if (++index === promise.length) {
//             resolve(result);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     }
//   });
// }

// 6 --- 异步任务调度函数
// 测试代码：
// class Scheduler {
//   list = [];
//   count = 0;
//   constructor(num) {
//     this.num = num;
//   }
//   async add(fn) {
//     if (this.count >= this.num) {
//       await new Promise((resolve) => {
//         this.list.push(resolve);
//       });
//     }
//     this.count++;
//     const result = await fn();
//     this.count--;

//     if (this.list.length > 0) this.list.shift()();
//     return result;
//   }
// }
// const schedule = new Scheduler(3); //最多同一时间让它执行3个异步函数
// const asyncFacotory = (n, time) => {
//   return () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(n);
//       }, time);
//     });
//   };
// };
// schedule.add(asyncFacotory(1, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });
// schedule.add(asyncFacotory(2, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });
// schedule.add(asyncFacotory(3, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });
// schedule.add(asyncFacotory(4, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });
// schedule.add(asyncFacotory(5, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });
// schedule.add(asyncFacotory(6, 2000)).then((n) => {
//   console.log(`异步任务:${n}`);
// });

// 7 --- 数组扁平化
// function flatten(arr) {
// 方法1 如果数组元素都是数字
//   return arr
//     .toString()
//     .split(",")
//     .map((item) => +item);
// 方法2 递归
//   arr.forEach((item) => {
//     if (item instanceof Array) {
//       flatten(item, res);
//     } else {
//       res.push(item);
//     }
//   });
//   return res;
//   方法3:运用扩展运算符
//   while (arr.some((item) => Array.isArray(item))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }
// let arr = [1, [2, [3, [4]]]];
// console.log(flatten(arr));

// 8 ---- 全排列
// function test(nums) {
//   let res = [],
//     temp = [];
//   function track(temp) {
//     if (temp.length === nums.length) {
//       res.push(Array.from(temp));
//       return;
//     }
//     for (let i = 0; i < nums.length; i++) {
//       if (temp.includes(nums[i])) {
//         continue;
//       }
//       temp.push(nums[i]);
//       track(temp);
//       temp.pop();
//     }
//   }
//   track(temp);
//   return res;
// }
// 测试代码
// let arr = [1, 2, 3];
// 输出[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// console.log(test(arr));

// 9 --- 节流 和 防抖

// 防抖
// 基础版本：
// function debounce(fn, time, immediate) {
//   let timeout = null;
//   return function (...args) {
//     if (timeout) clearTimeout(timeout);
//     if (!immediate) {
//       timeout = setTimeout(() => {
//         fn.apply(this, ...args);
//       }, time);
//     } else {
//       let callNow = !timeout;
//       timeout = setTimeout(() => {
//         timeout = null;
//       }, time);
//       if (callNow) fn.apply(this, ...args);
//     }
//   };
// }
// function throttle(fn, time, immediate) {
//   let pre = 0;
//   return function (...args) {
//     let now = Date.now();
//     if (now - pre > time) {
//       pre = now;
//       fn.apply(this, ...args);
//     }
//   };
// }

//  10 ----- 数组打乱
// 方法1
// let values = [1, 2, 3, 4, 5, 6];
// values.sort(() => {
//   return Math.random() - 0.5;
// });
// 方法2
// for (let i = 1; i < values.length; i++) {
//   let j = Math.floor(Math.random() * i);
//   [values[i - 1], values[j]] = [values[j], values[i - 1]];
// }

// console.log(values);

// 11 --- 实现instanceof ---
// function myInstanceOf(A, B) {

// }
// function Person() {}
// function Child() {}

// 12 --- 实现 lodash 的get方法
// 测试代码
// var object = { a: [{ b: { c: 3 } }] };
// console.log(_get(object, "a[0].b.c"));
// // => 3
// console.log(_get(object, "a.b.c", "default"));
// // => 'default'
// function _get(source, path, defaultValue = undefined) {
//   // 将数组格式的路径转化成dot格式的，再拆分成key数组
//   // a[0].b -> a.0.b -> ['a', '0', 'b']
//   const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
//   let result = source;
//   //   console.log(paths);
//   for (const p of paths) {
//     result = Object(result)[p];
//   }
//   return result || defaultValue;
// }
// let str1 = "首单享受<hightLight>50</highLight>元福利";
// // 转换成
// // ("首单享受<span class='highLight'>50</span>元福利");
// let reg = /<\/?\w*>/g;
// console.log(
//   str1.replace(reg, function (str) {
//     let class1 = str.substring(1, str.length - 1);
//     if (str.indexOf("/") !== -1) {
//       return `</span>`;
//     } else {
//       return `<span class='${class1}'>`;
//     }
//   })
// );

// console.log(1);

// setTimeout(() => {
//   console.log(2);
// });

// process.nextTick(() => {
//   console.log(3);
// });

// setImmediate(() => {
//   console.log(4);
// });

// new Promise((resolve) => {
//   console.log(5);
//   resolve();
//   console.log(6);
// }).then(() => {
//   console.log(7);
// });

// Promise.resolve().then(() => {
//   console.log(8);
//   process.nextTick(() => {
//     console.log(9);
//   });
// });
// 1 5 6 3 7 8 9 2 4

// 给定一个字符串 str ，输出字符串中被"()"包裹的字符串

//     有效字符串需满足：

//     左括号必须用相同类型的右括号闭合。
//     左括号必须以正确的顺序闭合。

//     示例：

// let str = "(a+b)*c+((d-e)+f)";

// // a+b
// // (d-e)+f
// // d-e
// function logStr(str) {
//   str.replace(/\([\w|\+|\-\(?\)?]*\)/g, function (str, i) {
//     let subStr = str.substring(1, str.length - 1);
//     if (subStr.indexOf("(") !== -1 || subStr.indexOf(")") !== -1) {
//       logStr(subStr);
//     }
//     console.log(subStr);
//   });
// }
// logStr(str);

// function shuchu(str) {
//   var arr = [],
//     result = [];

//   for (var i = 0; i < str.length; i++) {
//     if (str[i] == "(") {
//       arr.push(i);
//     }
//     if (str[i] == ")") {
//       result.push(str.slice(arr[arr.length - 1] + 1, i));
//       arr.pop();
//     }
//   }
//   return result;
// }
// console.log(shuchu(str));

// ---手写题---
// const input = ["A-B-C", "A-B-D", "A-X-Y"];
// /**output:[
//   {
//     "name": "A",
//     "path": "A",
//     "children": [
//       {
//         "name": "B",
//         "path": "A-B",
//         "children": [
//           {
//             "name": "C",
//             "path": "A-B-C",
//             "children": []
//           },
//           {
//             "name": "D",
//             "path": "A-B-D",
//             "children": []
//           }
//         ]
//       },
//       {
//         "name": "X",
//         "path": "A-X",
//         "children": [
//           {
//             "name": "Y",
//             "path": "A-X-Y",
//             "children": []
//           }
//         ]
//       }
//     ]
//   }
// ]
// */
// function toTree(input) {
//   let output = new treeNode(),
//     tempArr = [],
//     hasMap = {};
//   // tempArr = [{name:A,parentName:""},{name:B,parentName:"A"},{name:C,parentName:B}]
//   input.forEach((item, index) => {
//     if (index === 0) {
//       output.name = item[0];
//       output.path = item[0];
//       output.children = [];
//       tempArr.push({ name: item[0], parentName: "" });
//     }
//     let curArr = item.split("-");
//     for (let i = 1; i < curArr.length; i++) {
//       let tItem = curArr[i];
//       console.log(tItem);
//       if (hasMap.hasOwnProperty(tItem)) {
//         continue;
//       }
//       hasMap[tItem] = 1;
//       tempArr.push({ name: tItem, parentName: curArr[i - 1] });
//     }
//   });
//   function loop(output, path) {
//     for (let i = 0; i < tempArr.length; i++) {
//       if (output.name === tempArr[i].parentName) {
//         output.children.push(
//           new treeNode(tempArr[i].name, path + "-" + tempArr[i].name, [])
//         );
//       }
//     }
//     for (let i = 0; i < output.children.length; i++) {
//       loop(output.children[i], output.children[i].path);
//     }
//   }
//   loop(output, output.path);
//   return output;
// }

// function treeNode(name = undefined, path = undefined, children = []) {
//   this.name = name;
//   this.path = path;
//   this.children = children;
// }
// let r = toTree(input);
// console.log("result--", JSON.stringify(r, null, 2));

// function convert(data) {
//   let output = [];
//   let dict = {};
//   for (let i = 0; i < data.length; i++) {
//     const nodeArray = input[i].split("-");
//     helper(nodeArray, 0, output, "");
//   }
//   function helper(nodeArray, index, currentData, path) {
//     if (index === nodeArray.length) return;
//     const value = {
//       name: nodeArray[index],
//       path: path === "" ? nodeArray[index] : path + "-" + nodeArray[index],
//       children: [],
//     };
//     if (dict.hasOwnProperty(value.path)) {
//       // 如果路径存过直接下一个
//       helper(nodeArray, index + 1, dict[value.path], value.path);
//     } else {
//       // 没有路径则新添加
//       const currentIndex = currentData.push(value);
//       dict[value.path] = currentData[currentIndex - 1].children;
//       helper(
//         nodeArray,
//         index + 1,
//         currentData[currentIndex - 1].children,
//         value.path
//       );
//     }
//   }
//   return output;
// }

// const input = ["A-B-C", "A-B-D", "A-X-Y"];
// console.log(JSON.stringify(convert(input), null, 2));
