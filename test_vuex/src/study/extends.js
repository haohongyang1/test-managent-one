// 继承方式：原型链继承、借用构造函数继承、组合继承、原型式继承、寄生式继承、寄生组合式继承

// 声明父类
function Animal() {
  this.name = "name";
  if (typeof this.feed !== "function") {
    // 声明方法
    Animal.prototype.feed = function (food) {
      console.log(food);
    };
  }
}
// 子类
function Dog() {
  Animal.apply(this, arguments);
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

function extend(A, B) {
  A.apply(B);
  B.prototype = new A();
  B.prototype.constructor = B;
}
function Cat() {}
extend(Animal, Cat);
const cat = new Cat();
console.log(cat.name);

// 原型链继承---来自原型对象的所有属性将被所有实例共享，创建子类实例时，无法向父类构造函数传参
Son.prototype = Person;
// 借用构造函数继承---无法实现函数复用，每个子类都有父类函数副本
function Son() {
  Person.call(this);
}
// 组合继承
function Son() {
  Person.call(this);
}
Son.prototype = new Person();
// 寄生组合继承
function extend(A, B) {
  A.apply(B);
  B.prototype = new A();
  B.prototype.constructor = B;
}
