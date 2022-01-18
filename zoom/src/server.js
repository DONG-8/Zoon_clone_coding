import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
// console.log("hello");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000/");

const server = http.createServer(app); // http 서버만들기
const wss = new WebSocket.Server({ server });

// function handelConnection(socket) {
//   console.log(socket)
// }
const sockets = [];

// 웹 소켓에도 js처럼 이벤트가 있다.
wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  // console.log(socket);
  // 이제 브라우저에 메세지를 보내보자

  socket.send("hello!!! from back!!");

  // 서버로부터 메세지 받기
  // 창이 닫아지면
  socket.on("close", () => console.log("클라이언트로부터 연결끊김"));
  sockets.push(socket); // 소켓에 대한 정보가 들어감
  socket["nickname"] = "Anon";
  socket.on("message", (msg) => {
    // console.log(message.toString('utf8'))
    // socket.send(message.toString('utf8'))
    // console.log(message.toString("utf8"));
    // console.log(parsed);
    //  if문 switch로 변경
    // if (parsed.type === "new_message") {
    //   sockets.forEach((aSocket) => {
    //     aSocket.send(parsed.payload);
    //   });
    // } else if (parsed.type === "nickname") {
    //   console.log(parsed.payload);
    // }
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname} : ${message.payload}`);
        });
        break;
      case "nickname":
        // console.log(message.payload);
        socket["nickname"] = message.payload;
        break;
    }
  });
});
// socket을 반납 받는다.. 연결된 브라우저와의 contact 라인이다.
// 소켓을 이용하면 메세지를 주고받을 수 있는데 이를 어딘가에 저장해야한다.
// on 메소드는 backend 에 연결된 사람의 정보를 제공해준다.

server.listen(3000, handleListen);
// app.listen(3000,handleListen);
