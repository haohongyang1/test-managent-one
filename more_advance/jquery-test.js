// ------- 在源码中学到的思维与技巧 -------

(function (window, undefined) {
  // 见1
  function jquery(selector) {
    // 见2
    return new jquery.fn.init(selector);
  }
  // 见5
  jquery.fn.init.prototype = jquery.fn;
  jquery.fn = jquery.prototype = {
    init: function () {},
  };

  window.$ = window.jquery = jquery;
})(window, undefined);
// 建造者模式
function Vue() {}
// stateMixin(Vue) ...

/**
 * 实现一个 $.extend
 * 使用：
 * $.extend({a:1})  // 将这个对象合并到$中
 * $.extend({a:1}, {b:2}) // 如果给它两个对象，我就把第二个对象拷贝到第一个对象上去
 * --- 享元模式：---
 */

// 简易版：通过if-else写了重复逻辑，那么我们如何来优化这段代码呢？详细见下面【享元模式进阶版：】
// $.extend = function () {
//   if (arguments.length === 1) {
//     for (let item in arguments[0]) {
//       this[item] = arguments[0][item];
//     }
//   } else if (arguments.length === 2) {
//     for (let item in arguments[1]) {
//       arguments[0][item] = arguments[1][item];
//     }
//   }
// };
// 享元模式进阶版：
// 什么叫做享元？就是相同一个变量和逻辑被通用或者抽离
// 目的：减少代码块大小，避免相同逻辑重复去写
$.extend = function () {
  // source和target就是享元
  let source = arguments[0];
  let target = this;
  // 享元到底是什么，再进行判断
  if (arguments.length === 2) {
    target = arguments[1];
    source = arguments[1];
  }
  for (let item in source) {
    target[item] = srouce[item];
  }
};
/**
 * --- 1 --- 匿名函数中的参数为啥又重新传递一遍window和undefined？
 * js中变量的读取，基于作用域链查找，为了避免作用域链查找耗时；
 * --- 2 --- 在JQ源码中工厂模式的应用？
 * 如何应用？
 *    避免在使用过重复 new jquery
 * --- 3 --- 源码中的建造者模式 vue ？
 * 定义？
 *    帮组我们构建一个功能复杂的类
 * --- 4 --- 如何做到直接透传js的一些原生方法？比如($("/adsa").css、$.css)既支持通过实例化jquery调用，又支持通过jquery直接调用？
 * 通过两种定义
 *
 * --- 5 --- 为什么不直接往原型链上放东西
 * 谁都往上面放东西，不同的代码如何集成，一个个往原型链上放，如何分模块；
 * 所以建造者模式可以解决
 * 把要做的东西拆分成模块，模块独立开发，模块都开发好后，再混入到类上面；
 *
 * --- 6 --- 函数式编程
 * 把我想要的模块和方法，变成一个一个的函数；
 * vue3采用的是函数式变成，而不是建造者模式；
 * JS中类的实现比较差、函数式更有利于优化(尽量减小文件体积 利用tree-shaking删掉不需要的方法，如果直接挂在prototype上，tree-shaking是无法删掉的)；
 * lodash、Vue3都是使用函数式编程
 *
 * --- 7 --- 单例模式
 * VueX vue-route
 */

/**
 * 弹窗插件用工厂模式：需要一个弹窗就给我一个弹窗，不用每次弹窗都new一个实例化对象；
 * 在线编辑器使用建造者模式：图片插入模块、代码生成模块、字体调整模块等等最终整合成一个功能；
 */
/**
 * Vue2和Vue3
 * Vue3是使用函数式。支持tree-shaking，
 */

/**
 * 总结篇：
 * 1、源码构建无非是三种设计模式：
 * 工厂模式：jQuery
 *  why: 外界通过$(".a")来访问元素，无需实例化对象，内部通过工厂方法实例化对象后return；
 * 函数式：Vue3
 *  why: 可以通过tree-shaking进行函数式分割，
 * 建造者模式：Vue2
 *  why：拆分成几个模块进行开发，最后混入类中，比如initLifeCycle、initMixin...
 * 单例模式：VueX、Vue.install
 *  why：全局只实例化一个
 *
 *
 */
