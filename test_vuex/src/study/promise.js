// 问题
/**
 * 红绿灯：
 * 题目：红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次；如何让三个灯不断交替重复亮灯？
 */
// 前提：亮灯函数：
function red() {
  console.log("red==");
}
function green() {
  console.log("green==");
}
function yellow() {
  console.log("yellow==");
}
var light = function (timmer, cb) {
  return new Promise(function (resolve, reject) {
      setTimeout(function () {
          cb();
          resolve()
      }, timmer)
  });
};
var step = function () {
  Promise.resolve().then(function () {
      return light(3000,red) // 这里return一个Promise对象，下一步才能继续.then
  }).then(function () {
      return light(2000, green)
  }).then(function () {
      return light(1000, yellow)
  }).then(step)
};
step()
// 找出目录中最大的文件：
/**
 * 1、用fs.readdir获取目录中文件列表；
 * 2、循环遍历文件，使用fs.start获取文件信息；
 * 3、找出最大文件；
 * 4、以最大文件名为参数调用回调；
 */

var fs = require("fs");
var path = require("path");

var fs = require("fs");
var path = require("path");

function findLargest(dir, cb) {
  // 读取目录下的所有文件
  fs.readdir(dir, function (er, files) {
    if (er) return cb(er);

    var counter = files.length;
    var errored = false;
    var stats = [];

    files.forEach(function (file, index) {
      // 读取文件信息
      fs.stat(path.join(dir, file), function (er, stat) {
        if (errored) return;

        if (er) {
          errored = true;
          return cb(er);
        }

        stats[index] = stat;

        // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
        if (--counter == 0) {
          var largest = stats
            .filter(function (stat) {
              return stat.isFile();
            })
            .reduce(function (prev, next) {
              if (prev.size > next.size) return prev;
              return next;
            });

          cb(null, files[stats.indexOf(largest)]);
        }
      });
    });
  });
}
// @TEST
findLargest("./", function (er, filename) {
  if (er) return console.error(er);
  console.log("largest file was:", filename);
});
