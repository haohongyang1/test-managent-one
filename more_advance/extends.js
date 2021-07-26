function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
