// es5 call
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;
  let args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  console.log(args);
  var result = eval("context.fn(" + args + ")");
  delete context[fn];
  return result;
};

// es6 call
Function.prototype.newCall = function (context, ...args) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
};
function a() {}
a.newCall(null, 1, 2, 3);

// es5 apply
Function.prototype.apply2 = function (context) {
  var context = context || window;
  context.fn = this;
  let args = arguments[1];
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};

// es6 apply
Function.prototype.newApply = function (context, arr) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...arr);
  delete context[fn];
  return result;
};

function bar(name, age, a, b, c) {
  console.log(name, age, a, b, c);
}

// es5 bind
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    return;
  }
  var args = Array.prototype.slice.call(arguments, 1), // slice 从已有数组中返回选定元素
    fToBind = this,
    fNOP = function () {},
    fBound = function () {
      fToBind.apply(
        this instanceof fNOP ? this : context,
        args.concat(Array.prototype.slice.call(arguments))
      );
    };
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();
  return fBound;
};
// es6 bind
Function.prototype.newBind = function (context, ...args1) {
  let _this = this;
  return (...args2) => {
    return _this.apply(context, [...args1, ...args2]);
  };
};

var c = {
  value: 2,
};
var b = {
  value: 3,
};
// bar.newApply(c, [1, 2])
bar.newBind(c, 1, 2, 3)(3, 3, 4);

//////////////////////////////////////////////////////////////////
///////////////////////////// 原理 ///////////////////////
/////////////////////////////////////////////////////////////
// apply第一个参数的值
function test() {
  console.log(this);
}
test.apply(1); // 1
test.apply("a"); // 'a'
test.apply({}); // {}
test.apply(null); // window
test.apply(undefined); // window
test.apply(function () {}); // f() {}

// bar.call2(foo)

// this - 运行时环境
function fruits() {}

fruits.prototype = {
  color: "red",
  value: 2,
  say: function () {
    console.log("My color is " + this.color);
    console.log(this.value);
  },
};

function myCall(context, ...args) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
}
function myApply(context, ...args) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn]([...args]);
  delete context[fn];
  return result;
}
function myBind(fn, ...args1) {
  let _this = this;
  return function (...args2) {
    return myApply(_this, [...args1, ...args2]);
  };
}
