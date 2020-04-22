class Observer {
  constructor() {
    this.subs = {
      any: [],
    };
  }
  // 订阅
  subscribe(type = "any", fn) {
    if (!this.subs[type]) {
      this.subs[type] = [];
    }
    this.subs[type].push(fn);
  }
  // 取消订阅
  unSubscribe(type = "any", fn) {
    this.subs[type].filter((item) => {
      return item !== fn;
    });
  }
  // 发布
  publish(type = "any", ...args) {
    for (let item of this.subs[type]) {
      if (typeof item === "function") {
        item(...args);
      }
    }
  }
}
function a1() {
  console.log("测试1");
}
function a2() {
  console.log("测试2");
}
let observer = new Observer();
observer.subscribe("娱乐", a1);
observer.subscribe("体育", a2);
observer.publish("娱乐");
