let init = false;
class Vue1 {
  constructor(vm) {
    this.proxyData = observable(vm.data);
    compie(vm, this.proxyData);
  }
  test(val) {
    this.proxyData.name = val;
  }
}
function compie(vm, proxyData) {
  const root = document.querySelector(vm.el);
  compieRender(proxyData, vm.render, root);
}
function compieRender(proxyData, render, root) {
  if (render) {
    console.log(render);
    const varRegexp = /\{\{(.*?)\}\}/g;
    const varResult = render.replace(varRegexp, (a, b) => {
      if (!init) {
        new Watcher(proxyData, b, function () {
          compieRender(proxyData, render, root);
        });
      }
      return proxyData[b];
    });
    console.log(varResult);
    init = true;
    console.log(root);
    root.innerHTML = varResult;
  }
}
class Watcher {
  constructor(proxyData, property, fn) {
    this.proxyData = proxyData;
    this.property = property;
    this.fn = fn;
    this.value = this.get();
  }
  update() {
    const newValue = this.proxyData[this.property];
    if (newValue !== this.value && this.fn) {
      this.fn(this.value);
    }
  }
  get() {
    Dept.target = this;
    const value = this.proxyData[this.property];
    Dept.target = null;
    return value;
  }
}

class Dept {
  constructor() {
    this.watchers = [];
  }
  addWatcher(watcher) {
    this.watchers.push(watcher);
  }
  notify() {
    this.watchers.forEach((watcher) => {
      watcher.update();
    });
  }
}

function observable(obj) {
  const dep = new Dept();
  const proxy = new Proxy(obj, {
    set(target, key, val) {
      target[key] = val;
      dep.notify();
    },
    get(target, key) {
      console.log(key, target);
      let value = target[key];
      if (value && typeof value === "object") {
        target[key] = observable(value);
      }
      if (Dept.target) {
        dep.addWatcher(Dept.target);
      }
      return target[key];
    },
  });
  return proxy;
}
let vue = new Vue1({
  el: "#el",
  data: {
    name: "tom",
  },
  render: "<h1>{{name}}</h1>",
});

//
// new MyVue({
//     data: {msg: 'hello'}
// })
// -------- 问题：

class HVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    // 响应化
    this.observe(this.$data);
  }
  observe(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  // 定义响应式
  defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          // 通知依赖
          dep.notify();
        }
      },
    });
    this.observe(val);
  }
}
// 管理若干watcher示例，和key一对一关系
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}

// 保存UI中依赖，实现update函数可以更新UI
class Watcher {
  constructor(vm, key, cb) {
    // 当前vm、当前key、更新函数cb
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.vm[this.key]; // 添加Watcher到dep
    Dep.target = null;
  }
  update() {
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
