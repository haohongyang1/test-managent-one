let init = false
class Vue1{
  constructor(vm) {
    this.proxyData = observable(vm.data)
    compie(vm, this.proxyData)
  }
  test(val) {
    this.proxyData.name = val
  }
}
function compie(vm, proxyData) {
  const root = document.querySelector(vm.el)
  compieRender(proxyData, vm.render, root)
}
function compieRender(proxyData, render, root) {
  if(render) {
    console.log(render)
    const varRegexp = /\{\{(.*?)\}\}/g
    const varResult = render.replace(varRegexp, (a,b) => {
      if(!init) {
        new Watcher(proxyData, b, function() {
          compieRender(proxyData, render, root)
        })
      }
      return proxyData[b]
    })
    console.log(varResult)
    init = true
    console.log(root)
    root.innerHTML = varResult
  }
}
class Watcher{
  constructor(proxyData, property, fn) {
    this.proxyData = proxyData
    this.property = property
    this.fn = fn
    this.value = this.get()
  }
  update() {
    const newValue = this.proxyData[this.property]
    if(newValue !== this.value && this.fn) {
      this.fn(this.value)
    }
  }
  get() {
    Dept.target = this
    const value = this.proxyData[this.property]
    Dept.target = null
    return value
  }
}

class Dept{
  constructor() {
    this.watchers = []
  }
  addWatcher(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(watcher => {
      watcher.update()
    })
  }
}

function observable(obj) {
  const dep = new Dept()
  const proxy = new Proxy(obj, {
    set(target, key, val) {
      target[key] = val
      dep.notify()
    },
    get(target, key) {
      console.log(key, target)
      let value = target[key]
      if(value && typeof value === 'object') {
        target[key] = observable(value)
      }
      if(Dept.target) {
        dep.addWatcher(Dept.target)
      }
      return target[key]
    }
  })
  return proxy
}
let vue = new Vue1({
  el: '#el',
  data: {
    name: 'tom'
  },
  render: '<h1>{{name}}</h1>'
})



