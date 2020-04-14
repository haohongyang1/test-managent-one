class LimitPromise{
  constructor(max) {
    this.max = max
    this._count = 0
    this._taskQueue = [] // 待执行队列
  }
  call(caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = () => {
        caller(...args).then(resolve).catch(reject).finally(() => {
          this._count--
          if(this._taskQueue.length) {
            let fn = this._taskQueue.pop()
            fn()
          }
        })
        this._count++
      }
      if(this._count >= this.max) {
        this._taskQueue.push(task)
      }else {
        task()
      }
    })
  }
}
