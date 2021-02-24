// 观察者模式 ：（注意和发布-订阅模式不同的是，观察者模式是 发布者对订阅者是一对多的关系）
/**
 * 观察者模式和发布订阅模式的不同？
 * 发布者直接触及到订阅者的操作：PM把开发者拉群了，直接把需求文档给每个群成员，叫观察者模式；
 * 发布者不能直接触及到订阅者，而是由统一的第三方来完成实际的通信的操作：把需求文档上传到公共的需求平台，叫做发布-订阅模式；
 */
// ----- 简易版 -----
// 发布者
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
/**
 * 在实际的业务开发中，我们所有定制化的发布者/订阅者 逻辑都可以基于这两个基本类来改写
 * 我们可以通过拓展发布者类，来使所有的订阅者来监听某个特定状态的变化。
 */
// Prd发布类
class PrdPubliser extends Publisher {
  constructor() {
    super();
    // 初始化需求文档
    this.prdState = null;
    // 还没拉群，开发群目前为空
    this.observers = [];
  }
  // 该方法用于获取当前的prdState
  getState() {
    return this.prdState;
  }
  //   该方法用于改变prdState
  setState(state) {
    this.prdState = state;
    // 需求文档变更，通知所有开发者
    this.notify();
  }
}
// 订阅方，开发人员的任务也变得具体起来
class DeveloperObserver extends Observer {
  constructor() {
    super();
    // 订阅一下prd的状态
    this.prdState = {};
  }
  update(publisher) {
    this.prdState = publisher.getState();
    this.work();
  }
  work() {
    const prd = this.prdState;
    // 每天都要看着prd开发了
    console.log("996 begins...", prd);
  }
}
/**
 * ------- 应用1 -------
 * Vue 中的数据响应式：
 *  Observer：监听器
 *  Watcher：订阅者
 *  compile：编译器
 *  Dep：定义订阅者类
 */
// 定义订阅者类
class Dep {
  constructor() {
    this.subs = [];
  }
  addsub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
// 遍历所有的属性进行监听
function observer(target) {
  if (typeof target === "object") {
    Object.keys(target).forEach((key) => {
      defineReactive(key, target[key], target);
    });
  }
}
function defineReactive(key, value, target) {
  const dep = new Dep();
  // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
  observer(value);
  Object.defineProperty(target, key, {
    get: function () {
      return val;
      //   依赖收集
    },
    set: (val) => {
      val = value;
      //   通知更新
      dep.notify();
    },
    enumerable: true,
    configurable: false,
  });
}
/**
 * ------- 应用2 ------
 * 在Vue中使用 EventBus来实现组件间的通讯
 *
 *  实现一个 Event Bus / Event Emitter
 *  即：事件总线 （具体来说应该是发布-订阅模式）
 *  应用场景：A与B组件之间相隔比较远，除了是父子组件关系的emit传递外，再除了求助VueX外，可以使用事件总线的方式来沟通传递
 *  使用：this.bus.$on('someEvent', func) this.bus.$emit('someEvent', params)
 *  区别：在调用的过程中，没有出现具体的发布者和订阅者，全程只有bus这个东西在控制，这就是全局事件总线的特点，所有事件的发布或者订阅都必须经由事件中心
 */
// this.bus.$on('someEvent', func)
// this.bus.$emit('someEvent', params)
class EventEmitter {
  constructor() {
    //   handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {};
  }
  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(cb);
  }
  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }
  remove(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  //   为事件注册单次监听器
  once(eventName, cb) {
    //   对回调函数进行包装，使其执行完毕后自动被移除
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
