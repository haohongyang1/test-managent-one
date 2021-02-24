/**
 * 将使用多个参数的一个函数转换成一系列使用一个函数的参数的技术
 * function add(a,b) {
 * return a+b
 * }
 * add(1,2) // 3
 *
 * addCurry(1)(2) // 3
 */
// 将一个add的功能函数，转换成使用一个参数的技术
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}
console.log(sub_curry(add, 1, 2));
function curry(fn, length) {
  length = length || fn.length;
  var slice = Array.prototype.slice;

  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

function add(a, b, c) {
  console.log("add参数--", a, b, c);
  return a + b + c;
}

// var addCurry = curry(add, 1, 2, 3);
// addCurry(); // 3
// //或者
// var addCurry = curry(add, 1, 2, 3);
// addCurry(2); // 3
//或者
var addCurry = curry(add);
// console.log(addCurry(1, 2, 3)); // 3
// console.log(addCurry(1, 2)(3)); // 3
// console.log(addCurry()(1)(2)(3)); // 3
// console.log(addCurry()()()(1)(2)(3)); // 3
// console.log(addCurry(1)(2)(3));

function curry1(fn, args) {
  var length = fn.length;
  args = args || [];
  return function () {
    var _args = args.slice();
    for (let i = 0; i < arguments.length; i++) {
      _args.push(arguments[i]);
    }
    if (_args.length < length) {
      return curry1(fn, _args);
    } else {
      return fn(..._args);
    }
  };
}
