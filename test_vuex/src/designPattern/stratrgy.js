// 策略模式，可变策略，环境类
let stategies = {
    "S": function (salary) {
        return salary *2
    }
}
let calculate = function (level, salary) {
    if (level in stategies) {
        return stategies[level](salary)
    }
    return salary
}

// 表单验证

let registerForm = document.getElementById('form')
registerForm.onsubmit = function () {
    if (/正则/.test(registerForm.username)) {}
}

// 函数柯里化
function curry(fn, len = fn.length) {
    return _curry.call(this,fn,len)
}
function _curry(fn, len, ...args) {
    return function (...params) {
        console.log(params)
        let _args = [...args, ...params]
        console.log(_args)
        if (_args.length >= len) {
            return fn.apply(this, _args)
        } else {
            return _curry.call(this, fn, len, ..._args)
        }
    }
}
