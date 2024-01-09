var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var rutas = require('./rutas/rutas');
var path = require("path");
var session = require("cookie-session");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Configuraciones y middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: "session",
    keys: [process.env.KEY],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use('/web', express.static(path.join(__dirname, 'web')));
app.use('/bd', express.static(path.join(__dirname, 'bd')));


app.set('io', io);
// Rutas
app.use("/", rutas);

// Iniciar el servidor
var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Servidor en http://localhost:' + port);
});
