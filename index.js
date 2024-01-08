var express=require("express");
var rutas=require('./rutas/rutas');
var path=require("path");
var session=require("cookie-session");

var app=express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:"session",
    keys:[process.env.KEY],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use('/web', express.static(path.join(__dirname, 'web')));
app.use('/bd', express.static(path.join(__dirname, 'bd')));
app.use("/", rutas);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Servidor en http://localhost:'+port);
});