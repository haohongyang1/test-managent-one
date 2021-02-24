/**
 * ---------- Vue源码 ----------
 * 1 整体流程
 */
/**
 * 整体流程：
 *  new Vue()
 *      ⬇️init 初始化生命周期、props、methods、data、computed与watch等，通过defineProperty进行setter和getter
 *  $mount 此时会挂载组件，，如果是运行时编译，即不存在render function 但是存在template的情况，需要进行编译步骤
 *      ⬇️
 *  compile() 模板解析，包括
 *      parse 使用正则解析template 中的v-指令解析、class、style等等，最终 ：生成AST
 *      optimize 主要是标记静态节点，这是在Vue在编译过程中的一个优化，后面当update的过程中会有一个patch，diff会跳过静态节点，从而减少比较，优化patch性能
 *      generate 将AST转化成 render function 字符串的过程，得到的结果是render的字符串以及 staticRenderFns 字符串
 *      ⬇️
 *  render function 当render function被渲染的时候，因为会读取所需对象的值，所以会触发getter函数，进行依赖收集
 *  ⬇️                       ⬇️render
 * getter        setter     VDOM    这里的getter和setter是init过程中进行的绑定，依赖收集主要是：将观察者对象类Watcher存放在当前闭包中订阅者Dep中的订阅者subs中；
 *  ⬇️ 依赖收集     ⬇️notify   ⬇️
 *          ⬇️⬇️              ⬇️
 *        Watcher   观察者对象类，如果是getter过来的，就是要将观察者对象类存放在闭包中订阅Dep中的subs中，如果是setter过来的，就是要调用对应Watcher中已经存储的update来更新视图（注意这里有一个使用队列异步更新和patch的过程）
 *          ⬇️update         ⬇️
 *        patch()
 *          patchVNode
 *          updateChildren
 *          ⬇️               ⬇️
 *                  ⬇️
 *                 DOM
 */
