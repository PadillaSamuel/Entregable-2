const socket = io();

const form = document.getElementById("form-chat");
const inputName = document.getElementById("name");
const inputMessage = document.getElementById("message");
const chat = document.getElementById("chat");

try {
  inputName.value = localStorage.getItem("chat-name") || "";
} catch (e) {}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value.trim();
  const text = inputMessage.value.trim();

  if (!name) {
    alert("Write your name first");
    inputName.focus();
    return;
  }
  if (!text) return;

  try {
    localStorage.setItem("chat-name", name);
  } catch (e) {}

  socket.emit("chat:message", { name, text });
  inputMessage.value = "";
  inputMessage.focus();
});

socket.on("chat:message", (m) => {
  const empty = document.getElementById("empty");
  if (empty) empty.remove();

  const div = document.createElement("div");
  div.className = "msg";
  if (m.name === inputName.value.trim()) div.classList.add("own");

  const header = document.createElement("div");
  header.className = "msg-header";
  const who = document.createElement("strong");
  who.textContent = m.name;
  const hour = document.createElement("span");
  hour.className = "hour";
  hour.textContent = m.hour;
  header.append(who, hour);

  const p = document.createElement("p");
  p.textContent = m.text;

  div.append(header, p);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});

chat.scrollTop = chat.scrollHeight;
