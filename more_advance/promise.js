const { resolve } = require("path");

/**
 * 1、熟练掌握 Promise A+规范
 * 2、实现简单Promise
 * 3、如何处理的异步程序的状态改变
 * 4、链式调用: Promise里面没有this，所以不能通过return this实现链式调用，通过返回一个 new Promise
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = "";
    this.reason = "";
    this.onFullFulledCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      //触发
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onFullFulledCallbacks.forEach((cb) => cb());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      console.log("e-0--", e);
      this.reason = e;
      reject(e);
    }
  }
  then(onFullFilled, onRejected = () => {}) {
    let promise2 = new myPromise((resolve) => {
      if (this.status === PENDING) {
        //   处理异步的时候去收集
        this.onFullFulledCallbacks.push(() => {
          let x = onFullFilled(this.value);
          if (x instanceof myPromise) {
            x.then((res) => resolve(res));
          } else {
            resolve(x);
          }
          //   console.log("x", x);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          reject(x);
        });
      }
      if (this.status === FULFILLED) {
        let x = onFullFilled(this.value);
        resolve(x);
        // console.log("x", x);
      }
      if (this.status === REJECTED) {
        let x = onRejected(this.reason);
        reject(x);
      }
    });
    return promise2;
  }
  catch(onRejected) {
    if (this.status === PENDING) {
      this.onRejectedCallbacks.push(onRejected);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
  all(aPromise) {
    return new myPromise((resolve, reject) => {
      let len = aPromise.length,
        count = 0,
        result = [];

      for (let i = 0; i < len; i++) {
        console.log(aPromise[i].then);
        aPromise[i].then((val) => {
          result.push(val);
          count++;
          if (count == len) {
            console.log(result);
            resolve(result);
          }
        });
        // TODO 等待 链式调用的接入
        //   .catch((rea) => {
        //     reject(rea);
        //   });
      }
    });
  }
}
/**
 * 如何使用
 */

let promise1 = new myPromise((resolve, reject) => {
  console.log("Executor1");
  // 同步测试
  //   resolve("full1");
  // 异步测试
  setTimeout(() => {
    resolve("Fulled1");
  }, 1000);
  // 异常测试
  //   throw new Error("err");
  //   reject("err1");
});

promise1.then((value) => {
  return new myPromise((resolve) => {
    setTimeout(() => {
      resolve("链式调用Test", 111);
    }, 2000);
  });
});
promise1.catch(() => {
  console.log("catchTest");
});
// let promise2 = new myPromise((resolve, reject) => {
//   console.log("Executor2");
//   setTimeout(() => {
//     resolve("Fulled2");
//   }, 3000);
// });
// promise.all测试
// let a = new myPromise(() => {}).all([promise1, promise2]);
// console.log("aaa", a);
// a.then((result) => {
//   console.log("result---", result);
// });
// 链式调用测试
let promise3 = new myPromise((resolve) => {
  setTimeout(() => {
    resolve("resolveValue");
  }, 1000);
});
promise3
  .then((value) => {
    console.log("success", value);
    // return 1;
    return new myPromise((resolve) => {
      setTimeout(() => {
        resolve("链式调用Test");
      }, 2000);
    });
  })
  .then((value2) => {
    console.log("value2", value2);
    return 3;
  })
  .then((value3) => {
    console.log("value3", value3);
  });
/**
 * 链式调用特点：
 * 1、通过return传递结果
 * 2、传递的结果是：普通值和promise值
 * 3、已经reject后，只走距离new Promise最近的 rejected 函数，然后接下来会走then里面的内容；也就是，一旦失败，执行完catch最近的方法后，会继续走后面的then
 * 4、可以在catch中捕获异常
 */
