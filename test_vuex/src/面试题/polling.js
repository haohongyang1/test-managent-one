// 实现支付结果轮询；每3s轮询一次，执行3次，终止轮询结果
function pollingTest(fn, seconds, times, forwardVal) {
  return function (...args) {
    return new Promise((resolve) => {
      let _this = this,
        timerQueue = [];
      for (let i = 1; i <= times; i++) {
        timerQueue[i] = setTimeout(function () {
          let res;
          fn.apply(_this, [...args]).then((res) => {
            res = res;
            console.log(res);
            if (res === forwardVal) {
              for (let j = i + 1; j < timerQueue.length; j++) {
                clearTimeout(timerQueue[j]);
              }
              resolve("成功拿到");
            }
            if (i === times) resolve("超时未拿到");
          });
        }, seconds * i);
      }
    });
  };
}

function test(n) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(n);
    }, 2000);
  });
}
let res = pollingTest(test, 3000, 4, 1)(1);
res.then((res1) => {
  console.log(res);
});
