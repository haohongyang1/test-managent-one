/**
 * 对传入的参数进行求和
 */
const addAll = function () {
  console.log("进行了一次计算");
  let result = 0;
  const len = arguments.length;
  for (let i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
};
const proxyAddAll = (function () {
  const resultCache = {};
  return function () {
    const args = Array.prototype.join.call(arguments, "");
    if (args in resultCache) {
      return resultCache[args];
    }
    return (resultCache[args] = addAll(...arguments));
  };
})();
console.log("--", proxyAddAll(1, 2, 3, 4, 5));
console.log("--", proxyAddAll(1, 2, 3, 4, 5, 6));
