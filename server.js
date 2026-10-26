import { log } from "console";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./pages");

app.use(express.static("public"));

const publicity = [
  "¡Matrículas abiertas 2027!",
  "Descuento del 20% en cursos de inglés",
  "Visita la feria de software este viernes",
];
const messages = [];

app.get("/", (req, res) => {
  res.render("home", {
    titulo: "Chat en tiempo real",
    publicidad,
    mensajes,
  });
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat:message", (data) => {
    const nombre = String(data.nombre || "")
      .trim()
      .slice(0, 30);
    const texto = String(data.texto || "")
      .trim()
      .slice(0, 500);
    if (!nombre || !texto) return;
    const message = {
      nombre,
      texto,
      hora: new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Bogota",
      }),
    };
    messages.push(message); 
    io.emit('chat:message', message)
  });

  socket.on('disconnect', () => console.log('Usuario desconectado:', socket.id));

});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
