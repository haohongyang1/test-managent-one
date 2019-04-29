const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8888 });
// 一旦与之连接就出发connection事件
wss.on('connection', function (ws) {
console.log("connected");
// 客户端反馈给服务端的信息
ws.on('message', function (message) {
// 服务器给用户反馈会信息
ws.send(message);
console.log(message);
});