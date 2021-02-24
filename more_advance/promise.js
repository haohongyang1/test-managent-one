const { resolve } = require("path");

/**
 * 1、熟练掌握 Promise A+规范
 * 2、实现简单Promise
 * 3、如何处理的异步程序的状态改变
 * 4、链式调用: promise.all
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = "";
    this.reason = "";

    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    // 这里是发布者
    this.resolve = (value) => {
      this.status = FULFILLED;
      this.value = value;
      this.resolvedCallbacks.forEach((fn) => fn());
    };
    this.reject = (reason) => {
      this.status = REJECTED;
      this.reason = reason;
      this.rejectedCallbacks.forEach((fn) => fn());
    };
    executor(this.resolve, this.reject);
  }
  then(onFullFilled, onRejected) {
    if (this.status === FULFILLED) {
      onFullFilled(this.value);
    }
    if (this.status === REJECTED) {
      onFullFilled(this.reason);
    }
    // 遇到异步请求了，就开始订阅，当有改变的时候，执行callback
    if (this.status === PENDING) {
      this.resolvedCallbacks.push(() => {
        onFullFilled(this.value);
      });
      this.rejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
  all(arr) {}
}

/**
 * 如何使用
 */

let promise1 = new myPromise((resolve, reject) => {
  console.log("Executor1");
  setTimeout(() => {
    resolve("Fulled1");
  }, 1000);
});
promise1.then(
  () => {
    console.log("success");
  },
  () => {
    console.log("err");
  }
);
let promise2 = new myPromise((resolve, reject) => {
  console.log("Executor2");
  setTimeout(() => {
    resolve("Fulled2");
  }, 1000);
});
myPromise.all(promise1, promise2);
