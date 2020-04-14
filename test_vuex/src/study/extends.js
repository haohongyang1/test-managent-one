// 声明父类
function Animal() {
  this.name = 'name'
  if(typeof this.feed !== 'function') {
    // 声明方法
    Animal.prototype.feed = function(food) {
      console.log(food)
    }
  }
}
// 子类
function Dog() {
  Animal.apply(this, arguments)
}
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

function extend(A, B) {
  A.apply(B)
  B.prototype = new A()
  B.prototype.constructor = B
}
function Cat() {
}
extend(Animal, Cat)
const cat = new Cat()
console.log(cat.name)
