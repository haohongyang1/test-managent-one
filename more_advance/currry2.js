function add(a, b) {
  return a + b;
}

// 假设有一个 curry 函数可以做到柯里化
function helper(fn, argsArray) {
  return function () {
    return fn.apply(this, [...argsArray, ...arguments]);
  };
}
function curry(fn, length) {
  let len = length || fn.length;
  return function () {
    let newArgs = [...arguments];
    if (newArgs.length >= len) {
      return fn.apply(this, newArgs);
    } else {
      return curry(helper(fn, newArgs), len - newArgs.length);
    }
  };
}
function curry2(fn) {
  let len = fn.length;
  let preArgs = [...arguments];
  return function() {
    let newArgs = [...preArgs, ...arguments];
    if(newArgs.length >= len) {
      return fn.apply(this, newArgs);
    } else {
      return curry2.call(this, fn, newArgs);
    }
  }
}
var addCurry = curry2(add);
console.log(addCurry(1)(2));
