// 浅copy
function clone(target) {
  let res = {};
  for (const key in target) {
    res[key] = target[key];
  }
  return res;
}

// 深copy；使用map为了解决循环引用；使用WeakMap为了解决内存回收
function deepClone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    let res = Array.isArray(target) ? [] : {}; // {}
    if (map.get(target)) {
      //
      return map.get(target);
    }
    map.set(target);
    for (const key in target) {
      res[key] = deepClone(target[key]);
    }
    return res;
  } else {
    return target;
  }
}

const target = {
  field1: Symbol(1),
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  f: {
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } },
  },
};
console.time();
d = deepClone(target);
console.timeEnd();
console.log(d);

console.time();
e = deepClone(target);
console.timeEnd();
console.log(e);
