class Publisher {
  constructor() {
    this.observers = [];
  }
  //   增加订阅者
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }
  //   通知所有订阅者
  notify() {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}
// 订阅者
class Observer {
  constructor() {
    console.log("Observer created");
  }
  update() {
    console.log("update");
  }
}
