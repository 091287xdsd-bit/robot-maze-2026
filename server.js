const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 Server Trung Tâm (Siêu tốc độ) đang chạy trên cổng 8080...");

wss.on('connection', function connection(ws) {
  console.log("📡 Đã có thiết bị kết nối vào trạm!");

  ws.on('message', function incoming(message) {
    try {
        const msg = message.toString().trim();
        const data = JSON.parse(msg);

        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
          }
        });

        if (data.status === "running") console.log("🟢 [LASER XUẤT PHÁT] Đã kích hoạt đồng hồ Trọng tài!");
        if (data.status === "stopped") console.log("🔴 [LASER ĐÍCH] Đã chốt thời gian Trọng tài!");

    } catch (e) {
        console.log("Dữ liệu không hợp lệ:", message.toString());
    }
  });
});