/**
 * 推荐学习连接：
 * https://github.com/xieranmaya/blog/issues/3
 * 本文件演示如何一步一步实现Promise
 */

// 1、构造函数
// Promise函数接收一个 executor 函数，executor函数执行完同步或异步操作后，调用它的两个参数 resolve 和 reject

var promise1 = new Promise((resolve, reject) => {
  /**
   * 如果操作成功调用 resolve 并传入value
   * 如果操作失败调用 reject 并传入reason
   */
});
// 信任控制--第三方，
//
// promise2的值取决于then里面函数的返回值，如果promise1被resolved，将被4resolve，如果promise1被reject，promise2 将被new Error reject。
var promise2 = promise1.then(
  function (value) {
    return 4;
  },
  function (reason) {
    throw new Error("sth went wrong");
  }
);
// 参数透传
new Promise((resolve) => resolve(8))
  .then()
  .then()
  .then(function foo(value) {
    alert(value);
  });

function Promise(executor) {
  var self = this;
  self.status = "pending"; // Promise 当前状态
  self.data = undefined; // Promise的值
  self.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调函数添加到它上面
  self.onRejectCallback = []; // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(function () {
      // 异步执行所有回调
      if (self.status === "pending") {
        self.status = "resolved";
        self.data = value;
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value);
        }
      }
    });
  }
  function reject(reason) {
    setTimeout(function () {
      // 异步执行所有回调
      if (self.status === "pending") {
        self.status = "rejected";
        self.data = reason;
        for (let i = 0; i < self.onRejectCallback.length; i++) {
          self.onRejectCallback[i](reason);
        }
      }
    });
  }

  try {
    executor(resolve, reject); // 执行executor，并传入相应的参数
  } catch (e) {
    reject(e);
  }
}
// 回调收集器，每次创建新的promise
// then 方法接受两个参数，分别为 Promise 成功或失败后的回调；另外每个Promise对象都可以再多次调用then方法，而每次调用then返回的Promise的状态取决于那一次调用then时传入的参数的返回值，所以，then不能返回this，因为每次返回的Promise的结果都有可能不同
Promise.prototype.then = function (onResolved, onRejected) {
  var promise2;

  // 根据标准，如果onResolved不是个函数，我们需要忽略它，但是要透传值给下一层
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (v) {
          return v;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (r) {
          return r;
        };
  if (this.status === "resolved") {
    // 方法2: promise.defer
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(function () {
        // 异步执行的onResolved
        try {
          var x = onResolved(this.data);
          resolvePromise(promise2, x, resolve, reject);
          // 如果onResolved的返回值是一个Promise对象，直接取它结果结果promise2的结果
          // if (x instanceof Promise) {
          //     x.then(resolve, reject)
          // }
          // resolve(x) // 否则，以它的返回值做为promise2的结果
        } catch (e) {
          reject(e); // 如果出错，以捕获到的错误做为promise2的结果
        }
      });
    }));
  }
  if (this.status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        var x = onRejected(this.data);
        resolvePromise(promise2, x, resolve, reject);
        // if (x instanceof Promise) {
        //     x.then(resolve, reject)
        // }
        // resolve(x)
      } catch (e) {
        reject(e);
      }
    }));
  }
  if (this.status === "pending") {
    // 如果当前Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise的状态确定后，才能决定如何处理
    // 所以我们需要把我们的两种情况的处理逻辑做为callback放入promise的回调数组中，逻辑跟第一个if块几乎一致，此处不做过多解释
    return (promise2 = new Promise((resolve, reject) => {
      this.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(this.data);
          resolvePromise(promise2, x, resolve, reject);
          // if (x instanceof Promise) {
          //     x.then(resolve, reject)
          // }
          // resolve(x)
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectCallback.push(function (reason) {
        try {
          var x = onRejected(this.data);
          resolvePromise(promise2, x, resolve, reject);
          // if (x instanceof Promise) {
          //     x.then(resolve, reject)
          // }
          // resolve(x)
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.deferred = Promise.defer = function () {
  var dfd = {};
  dfd.promise = Promise.defer = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  };
};
// 根据x的值来决定promise2的状态的函数
function resolvePromise(promise2, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise!"));
  }
  // 两个人都按照promise a+来实现，promise a /b
  if (x instanceof Promise) {
    // 如果x状态还没有确定，那它很有可能是被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个正常的值resolve
    if (x.status === "pending") {
      x.then(function (value) {
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 鸭式辩型--判断方式
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function rs(y) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return resolvePromise(promise2, y, resolve, reject);
          },
          function rj(r) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
// 问题1:resolve和reject函数为什么不定义在构造函数里面？

/**
 * 因为executor函数里是以resolve(value)和reject(reason)这样去调用的，而不是以 resolve.call(promise, value) 和 reject.call(promise, reason)这种形式去调用的，所以这两个函数在调用的时候，内部必然也有一个隐含的this，也就是说，要么这两个函数是经过bind后传给了executor，要么他们是定义在了构造函数内部
 */

// 问题2:promise如何实现的异步？

/**
 * 将Promise.then(fn)中的fn存入了 onResolvedCallbacks 数组中，执行resolve(value)时，执行onResolvedCallbacks[i]方法，达到的异步执行
 */

// 问题3:不同的Promise之间如何交互
/**
 * 关于不同Promise之间的交互，其中详细指定了如何通过then的实参返回的值来决定promise2的状态
 * 即我们要把onResolved/onRejected的返回值x，当成一个可能是Promise的对象，并以最保险的方式调用x上的then方法，如果大家按照标准实现，那么不同的Promise之间就可以交互
 * 即使x返回了一个带有then属性但并不遵循Promise标准的对象，或者出错后又调用了他们，或者then根本不是一个函数，也尽可能的正确处理
 * 关于为啥需要不同的Promise实现能够相互交互，因为Promise并不是JS一早就有的标准，不同的第三方实现之间是并不互相知晓的，如果你使用的某一个库中封装了一个Promise实现，想象一下如果它不能跟你自己使用的Promise实现交互的场景...
 */
