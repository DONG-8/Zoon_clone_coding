import http from "http";
import express from "express";
import SocketIo from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
// console.log("hello");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000/");

const server = http.createServer(app); // http 서버만들기
// const wss = new WebSocket.Server({ server }); // 이건 소켓 io도 마찬가지로 쌓아내야함
const io = SocketIo(server);

io.on("connection", (socket) => {
  // console.log(socket); // 커넥션받을 준비 완료
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 10000);
  });
});

// 비교를 위한 주석처리
// const sockets = [];

// wss.on("connection", (socket) => {
//   console.log("Connected to Browser");

//   socket.send("hello!!! from back!!");

//   socket.on("close", () => console.log("클라이언트로부터 연결끊김"));
//   sockets.push(socket); // 소켓에 대한 정보가 들어감
//   socket["nickname"] = "Anon";
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) => {
//           aSocket.send(`${socket.nickname} : ${message.payload}`);
//         });
//         break;
//       case "nickname":
//         // console.log(message.payload);
//         socket["nickname"] = message.payload;
//         break;
//     }
//   });
// });

server.listen(3000, handleListen);
