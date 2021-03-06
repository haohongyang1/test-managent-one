const PEDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";
class Promise1 {
  constructor(handler) {
    this.status = PEDING;
    this.value = undefined;

    this._fulfilledQueues = [];
    this._rejectedQueues = [];

    handler(this._resolve.bind(this), this._rejected.bind(this));
  }

  _resolve(val) {
    setTimeout(() => {
      if (this.status === PEDING) {
        this.status = FULFILLED;
        this.value = val;
        this._fulfilledQueues.map((item) => {
          item(val);
        });
      }
    });
  }

  _rejected(val) {
    setTimeout(() => {
      if (this.status === PEDING) {
        this.status = REJECTED;
        this.value = val;
        this._rejectedQueues.map((item) => {
          item(val);
        });
      }
    }, 0);
  }

  then(resolve, reject) {
    if (this.status === PEDING) {
      this._fulfilledQueues.push(resolve);
      this._rejectedQueues.push(reject);
    }
    if (this.status === FULFILLED) {
      this._resolve(this.value);
    }
    if (this.status === REJECTED) {
      this._rejected(this.value);
    }
  }

  static all(list) {
    return new Promise1((resolve, reject) => {
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        this._resolve(p)
          .then((res) => {
            values[i] = res;
            count++;
            if (count === list.length) resolve(values);
          })
          .catch((e) => reject(e));
      }
    });
  }

  static race(list) {
    return new Promise1((resole, reject) => {
      let count = 0;
      for (let [k, v] of list.entries()) {
        this._resolve(v)
          .then((res) => {
            if (count === 0) resole(v);
            count++;
          })
          .catch((e) => reject(e));
      }
    });
  }
}

const promise = new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 5);
});
const promise1 = new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 5);
});

Promise.all([promise, promise1]).then((res) => {
  console.log(res);
});

class myPromise {
  constructor(handler) {
    this.status = "pending";
    this.value;
    this._fullfilledQueue = [];
    this._rejectedQueue = [];
    handler(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(val) {
    if (this.status === "pending") {
      this.status = "fullfilled";
      this.value = val;
      this._fullfilledQueue.forEach((item) => {
        item(val);
      });
    }
  }
  _reject(reason) {
    if (this.status === "pending") {
      this.status = "rejected";
      this.value = reason;
      this._rejectedQueues.forEach((item) => {
        item(val);
      });
    }
  }
  then(val) {
    if (this.status === "pending") {
      this._fullfilledQueue.push(val);
      this._rejectedQueue.push(val);
    }
    if (this.status === "fullfilled") {
      this._resolve(val);
    }
    if (this.status === "rejected") {
      this._reject(val);
    }
  }
  all(list) {
    return new myPromise((resolve) => {
      let result = [],
        count = 0;
      for (let [i, p] in list.entries()) {
        this._resolve(p).then((res) => {
          result[i] = res;
          count++;
          if (count === list.length) resolve(result);
        });
      }
    });
  }
  race(list) {}
}
