function _instanceof(fn, obj) {
  if(typeof obj !== 'object') return false
  if(obj.__proto__) {
    if(obj.__proto__ === fn.prototype) return true
    return _instanceof(fn, obj.__proto__)
  }
  return false
}
console.log(_instanceof(Array, '12312'))
