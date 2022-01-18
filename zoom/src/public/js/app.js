const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`); // 내가 어디에 있는지 알려주는것

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// 메세지 받기
// 메세지는 이벤트이다.
// 백엔드에서 발생한 이벤트를 받아야지!
socket.addEventListener("open", () => {
  console.log("Connected to Browser 🕶");
});

// 한개 더 추가
socket.addEventListener("message", (message) => {
  // console.log("Just got this:", message.data, " from the server")
  // const li = document.createElement("li");
  // li.innerText = message.data;
  // messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Connected from Server X");
});

// setTimeout( () => {
//   socket.send("hello from the browser!")
// } ,10000)
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `you : ${input.value}`;
  messageList.append(li);
  input.value = "";
  // console.log(input.value)
}
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value)); // json 형태로 변경 지금은 string을 보내는것이 아님
  input.value = "";
  // console.log(input.value)
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
