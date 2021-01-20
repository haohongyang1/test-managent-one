// 1-----实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
class Storage {
  static getIntance() {
    Storage.instance = null;
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    localStorage.setItem(key, value);
  }
}
// 闭包实现

function StorageBase() {
  StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key);
  };
  StorageBase.prototype.setItem = function (key, value) {
    localStorage.setItem(key, value);
  };
}
const getInstance = (function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new StorageBase();
    }
    return instance;
  };
})();
// 2---- 实现一个全局唯一的Modal弹框
/** 假设有如下按钮来控制其打开和关闭
<body>
	<button id='open'>打开弹框</button>
	<button id='close'>关闭弹框</button>
</body>
 */

const Modal = (function () {
  let modal = null;
  return function () {
    if (!modal) {
      modal = document.createElement("div");
      modal.innerHTML("我是一个全局Modal弹窗");
      modal.id = "modal";
      modal.style.display = "none";
      document.body.appendChild(modal);
    }
    return modal;
  };
})();

document.getElementById("open").addEventListener("click", function () {
  const modal = new Modal();
  modal.style.display = "block";
});
document.getElementById("close").addEventListener("click", function () {
  const modal = new Modal();
  if (modal) {
    modal.style.display = "none";
  }
});
/**
 * 使用装饰器模式优化以上代码
 * 1、单一原则：抽离方法，增加新逻辑可以直接在原有基础逻辑上封装，目的是不影响原有逻辑
 * 2、
 */
function openModel() {
  const modal = new Modal();
  modal.style.display = "block";
}
// 定义打开按钮
class OpenButton {
  // 点击后展示弹框（旧逻辑）
  onClick() {
    const modal = new Modal();
    modal.style.display = "block";
  }
}
// 定义按钮对应的装饰器
class Decorator {
  // 将按钮实例传入
  constructor(open_button) {
    this.open_button = open_button;
  }
  onClick() {
    this.open_button.onClick();
    // 包装了一层新逻辑
    this.changeButtonStatus();
  }
  changeButtonStatus() {
    this.changeButtonStatus();
    this.disableButton();
  }
  disableButton() {
    const btn = document.getElementById("open");
    btn.setAttribute("disabled", true);
  }
  changeButtonText() {
    const btn = document.getElementById("open");
    btn.innerText = "快去登录";
  }
}
const openButton = new OpenButton();
const decorator = new Decorator();
document.getElementById("open").addEventListener("click", function () {
  decorator.onClick();
});

(function (baseFont) {
  const _baseFontSize = baseFontSize || 75;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d){3}/i);
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  const dpr = window.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534)) {
    // 如果不是IOS，非安卓4.3以上，dpr为1
    dpr = 1;
  }
  const scale = 1 / dpr;
  const metaEl = document.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = document.createElement("meta");
    metaEl.setAttribute("name", "viewport");
    window.document.head.appendChild(metaEl);
  }
  metaEl.setAttribute(
    "content",
    "width=device-width,user-scalable=no,initial-scale=",
    scale + ",maximum-scale=" + scale + ",minimun-scale=" + scale
  );
  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / (750 / _baseFontSize) + "px";
})();
