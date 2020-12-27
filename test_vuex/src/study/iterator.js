// ES5实现简单的 iterator
function createIterator(items) {
  var i = 0;
  return {
    next: function () {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
  };
}
var iterator = createIterator([1, 2, 3]);
// console.log(iterator.next())
// 是否能用 for of 遍历？？
for (let value of iterator) {
  console.log(value);
} // 直接报错
// 那么如何来解决呢？
const obj = {
  value: 1,
};
obj[Symbol.iterator] = function () {
  return createIterator([1, 2, 3]);
};
for (value of obj) {
  console.log(value);
}
//  模拟实现for of
function forOf(obj, cb) {
  let iterable, result;
  if (typeof obj[Symbol.iterator] !== "function") {
    throw new TypeError(result + " is not iterable");
  }
  if (typeof cb !== "function") {
    throw new TypeError("cb must be callable");
  }
  iterable = obj[Symbol.iterator]();
  result = iterable.next();
  while (!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}

forOf(obj, (value) => {
  console.log(value);
});
