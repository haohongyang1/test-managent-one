// 1 单个异步任务
var fetch = require("node-fetch");
function* gen() {
    var url = "https://api.github.com/users/github"
    var result = yield fetch(url)
    console.log(result.bio)
}

// 为了获取最终结果，需要这样做
var g =gen()
var result = g.next()

result.value.then(function (data) {
    return data.json()
}).then(function (data) {
    g.next(data)
})

// 2 多个异步任务
function* gen2() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var r3 = yield fetch('https://api.github.com/users/github/repos');
    
    console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'))
}
// 为了获取最终执行结果，可能要写成
