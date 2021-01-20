function lodashGet(data = {}, targetVal = "", defaultVal) {
  if (typeof data === "object") {
    try {
      result = eval("data." + targetVal);
      if (result === null || result === undefined) {
        return defaultVal;
      }
      return result;
    } catch (e) {
      return defaultVal;
    }
  } else {
    return defaultVal;
  }
}
console.log(lodashGet({ a: null }, "a.b.c", 3));
console.log(lodashGet({ a: undefined }, "a", 3));
console.log(lodashGet({ a: null }, "a", 3));
console.log(lodashGet({ a: [{ b: 1 }] }, "a[0].b", 3));
