const socket = io();

const form = document.getElementById("form-chat");
const inputName = document.getElementById("nombre");
const inputMessage = document.getElementById("mensaje");
const chat = document.getElementById("chat");

try {
  inputNombre.value = localStorage.getItem("chat-name") || "";
} catch (e) {}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value.trim();
  const text = inputMessage.value.trim();

  if (!name) {
    alert("Escribe tu nombre primero");
    inputName.focus();
    return;
  }
  if (!text) return;

  try {
    localStorage.setItem("chat-name", name);
  } catch (e) {}

  socket.emit("chat:message", { name, text });
  inputMensaje.value = "";
  inputMensaje.focus();
});

socket.on("chat:message", (m) => {
  const empty = document.getElementById("empty");
  if (empty) empty.remove();

  const div = document.createElement("div");
  div.className = "msg";
  if (m.name === inputName.value.trim()) div.classList.add("own");

  const cab = document.createElement("div");
  cab.className = "msg-cabecera";
  const who = document.createElement("strong");
  who.textContent = m.name; 
  const hora = document.createElement("span");
  hora.className = "hora";
  hora.textContent = m.hour;
  cab.append(who, hour);

  const p = document.createElement("p");
  p.textContent = m.texto;

  div.append(cab, p);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});

chat.scrollTop = chat.scrollHeight;
