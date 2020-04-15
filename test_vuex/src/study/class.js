class A{
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `${this.x} - ${this.y}`
  }
}
class B extends A{
  constructor(x,y,color) {
    super(x,y)
    this.color = color
  }
  toString() {
    return `${this.x} - ${this.y} - ${this.color}`
  }
}
let a = new B(1,2,'blue')
console.log(a instanceof A)
