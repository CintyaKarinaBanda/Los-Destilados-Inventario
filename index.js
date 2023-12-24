var express=require("express");
var rutas=require('./rutas/rutas');
//var cors=require("cors");
var path=require("path");

var app=express();
app.set("view engine","ejs");
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/web', express.static(path.join(__dirname, 'web')));
app.use('/bd', express.static(path.join(__dirname, 'bd')));
app.use("/", rutas);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Servidor en http://localhost:'+port);
});