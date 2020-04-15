class Observer {
  constructor() {
    this.subs = {
      'any': []
    }
  }
  subscribe(type='any', fn) {
    if(!this.subs[type]) {
      this.subs[type] = []
    }
    this.subs[type].push(fn)
  }
  unSubscribe(type='any', fn) {
    this.subs[type].filter(item => {
      return item !== fn
    })
  }
  publish(type='any', ...args) {
    for(let item of this.subs[type]) {
      if(typeof item === 'function') {
        item(...args)
      }
    }
  }
}
function a1() {
  console.log('测试1')
}
function a2() {
  console.log('测试2')
}
let observer = new Observer()
observer.subscribe('娱乐',a1)
observer.subscribe('体育',a2)
observer.publish('娱乐')
