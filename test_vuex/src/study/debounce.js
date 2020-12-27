// 防抖应用 dou--debounce - 联想输入  高频事件后，等待设定时间后触发
// 节流应用 liu--throttle -  鼠标移动事件    高频事件触发，n秒内执行一次

const debounce = (fn, wait, immediate) => {
  let timeout;
  return function () {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let run = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (run) fn.apply(this, arguments);
    } else {
      timeout = setTimeout(function () {
        fn.apply(this, arguments);
      }, wait);
    }
  };
};

const trottle = (fn, wait, immediate) => {
  if (immediate) {
    var pre = 0;
  } else {
    var timeout;
  }
  return function () {
    if (immediate) {
      let now = Date.now();
      if (now - pre >= wait) {
        fn.apply(this, arguments);
        pre = now;
      }
    } else {
      if (!timeout) {
        timeout = setTiemout(function () {
          timeout = null;
          fn.apply(this, arguments);
        }, wait);
      }
    }
  };
};
function test() {
  console.log(1);
}
let f = trottle(test, 3000, true);
setInterval(function () {
  f(11);
}, 100);

