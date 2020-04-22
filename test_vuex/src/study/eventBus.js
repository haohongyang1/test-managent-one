class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
  }
}
// 触发名为type的事件
EventEmeitter.prototype.emit = function (type, ...args) {
  let handler = this._events.get(type);
  if (Array.isArray(handler)) {
    // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
    for (let i = 0; i < handler.length; i++) {
      handler[i].apply(this, args);
    }
  } else {
    handler.apply(this, args);
  }

  return true;
};
// 监听名为type的事件
EventEmeitter.prototype.addListener = function (type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === "function") {
    this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
  } else {
    handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
  }
};
