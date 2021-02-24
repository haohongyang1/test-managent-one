/**
 * 实现一个函数 createRequest(count)，count是数字参数，能使：
 * const request = createRequest(3)
 * request(url)
 * request(url)
 * request(url)
 * request(url)
 * request(url)
 * 同时并行只能发起3个异步请求，所有请求都要正常执行完
 */
let axios = {
  get: function (arg, cb) {
    setTimeout(() => {
      cb();
      console.log(arg);
    }, 1000);
  },
};
function createRequest(count) {
  if (count <= 0) return;
  let waitQueue = [];
  let times = count;
  return function request(urlStr) {
    if (times <= 0) {
      waitQueue.push(urlStr);
      return;
    }
    times--;
    axios.get(urlStr, () => {
      times++;
      waitQueue.length > 0 && request(waitQueue.shift());
    });
  };
}
const request = createRequest(1);
console.log(request);
request("/1");
request("/2");
request("/3");
request("/4");
// request("/5");
