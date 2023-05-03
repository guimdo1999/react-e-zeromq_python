// Realiza o require do express, http, e socketio
var app = require("express")();
// passa o express para o http-server
var http = require("http").Server(app);
// passa o http-server par ao socketio
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// cria uma rota para fornecer o arquivo index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on("connect", function (socket) {
  socket.on("message", function (msg) {
    io.emit("message", msg);
  });
  socket.on("foo1", async function () {
    var tempo = 1;
    while (tempo <= 10) {
        var random = Math.floor(Math.random() * 100);
        await new Promise(resolve => setTimeout(resolve, 500));
        io.emit("foo1", { foo: random, x: tempo });
        console.log(random + "-" + tempo);
        tempo++;
      
    }
  });
});

// inicia o servidor na porta informada, no caso vamo iniciar na porta 3000
http.listen(5000, function () {
  console.log("Servidor rodando em: http://localhost:5000");
});
