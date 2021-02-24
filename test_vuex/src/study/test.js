class myPromise {
  // 变量私有
  constructor(exe) {
    this.status = "pending";
    this.value = "";
    this.reason = "";
    this.onResolveCallback = [];
    this.onRejectCallback = [];
    exe(this._resolve, this._reject);
  }
  then(fn) {
    if (this.status === "pending") {
      this.onResolveCallback.push(fn);
    }
    if (this.status === "resolved") {
      this.onRejectCallback.forEach((cb) => cb());
    }
  }
  _resolve(value) {
    if (this.status === "pending") {
      this.status = "resolved";
      this.onResolveCallback.push(cb);
    }
  }
  _reject() {}
}

function Person(fn, arg) {
  let r = Object.create(fn);
  r.prototype = Person;
  return r;
}


function Parent (name) {
    this.name = name
    this.color = ['red','color']
}
Parent.prototype.getName = function () {console.log(this.name)}
function Child(name, age) {
    Parent.call(this, name) // 这叫做借用构造函数，直接把构造函数this的调用都指向父亲，实现了继承可以在child中向父传递参数
    this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child // 保留自己的属性

// 原型式继承
function createObj (o) {
    function F() {}
    F.prototype = o
    return new F()
}