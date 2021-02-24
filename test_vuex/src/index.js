var express = require("express");
var fs = require("fs");
var app = express();
// var path = require("path")

//方法1：通过express.static访问静态文件，这里访问的是ajax.html
// app.use(express.static("./"));

//方法2：使用fs.readFile打开html文件
app.get("./intercept.html", function (request, response) {
  fs.readFile("./" + request.path.substr(1), function (err, data) {
    // body
    if (err) {
      console.log(err);
      //404：NO ,....T FOUND
      response.writeHead(404, { "Content-Type": "text/html" });
    } else {
      //200：OK
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data.toString());
    }
    response.end();
  });
});

app.listen(3000, function () {
  //监听http://127.0.0.1:3000端口
  console.log("server start");
});

let index = {};

function myBuildTree(
  preorder,
  inorder,
  preorder_left,
  preorder_right,
  inorder_left,
  inorder_right
) {
  if (preorder_left > preorder_right) {
    return null;
  }

  // 前序遍历中的第一个节点就是根节点
  let preorder_root = preorder_left;
  // 在中序遍历中定位根节点
  let pIndex = index[preorder[preorder_root]];

  // 先把根节点建立出来
  let root = new TreeNode(preorder[preorder_root]);
  // 得到左子树中的节点数目
  let size_left_subtree = pIndex - inorder_left;
  // 递归地构造左子树，并连接到根节点
  // 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素
  root.left = myBuildTree(
    preorder,
    inorder,
    preorder_left + 1,
    preorder_left + size_left_subtree,
    inorder_left,
    pIndex - 1
  );
  // 递归地构造右子树，并连接到根节点
  // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素
  root.right = myBuildTree(
    preorder,
    inorder,
    preorder_left + size_left_subtree + 1,
    preorder_right,
    pIndex + 1,
    inorder_right
  );
  return root;
}

function buildTree(preorder, inorder) {
  let n = preorder.length;
  // 构造哈希映射，帮助我们快速定位根节点
  for (let i = 0; i < n; ++i) {
    index[inorder[i]] = i;
  }
  return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);
}
