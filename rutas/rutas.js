var rutas=require("express").Router();
var {mostrarProducto, nuevoProducto, modificarProducto, borrarProducto, buscarPorIDProducto, buscarPorNombre} = require("../bd/productobd.js");
var {nuevoRegistro, mostrarRegistro, borrarRegistro, modificarRegistro, buscarPorIDRegistro} = require("../bd/registro.js");
var {buscarRegistroMensual,sumaMensual,restaMensual}=require("../bd/mes.js");
var verificarSesion=require("../middlewares/session.js");
require('dotenv').config();


//---------------------------Ruta Ingreso------------------------------------
rutas.get("/", (req,res)=>{
    res.render("inicio");
});

rutas.post("/iniciarSesion", (req,res)=>{
    console.log(process.env.PASSWORD===req.body.password);
    if(process.env.PASSWORD===req.body.password){
        req.session.password = process.env.PASSWORD;
        res.redirect("/insertarRegistro");
    }  else {
        res.redirect("/")
    }
});


//---------------------------Ruta Iventario----------------------------------
rutas.get("/inventario", verificarSesion, async(req,res)=>{
    var inventario = await mostrarRegistro();
    res.render("ventas/inventario",{inventario});
});

//---------------------------Ruta Insertar Registro--------------------------
rutas.get("/insertarRegistro", verificarSesion, async(req,res)=>{
    console.log("Hola");
    var productos = await mostrarProducto();
    const formData = req.body || {};
    res.render("ventas/insertarRegistro", { formData , productos});
});

rutas.post("/insertarRegistro", async(req,res)=>{
    var productos = await mostrarProducto();
    req.body.fechaRegistro=new Date();
    var error=await nuevoRegistro(req.body);
    const formData = req.body;
    await sumaMensual(req.body);
    res.render("ventas/insertarRegistro", { formData , productos});
});

rutas.get('/llenarDatos/:valor', async (req, res) => {
    var nombreProducto = req.params.valor;
    var product = await buscarPorNombre(nombreProducto);
    res.json({ datos: product });
}) 

//---------------------------Ruta Modificar Registro------------------------
rutas.get("/modificarRegistro/:id", verificarSesion, async(req,res)=>{
    var productos = await mostrarProducto();
    var inventario=await buscarPorIDRegistro(req.params.id);
    await restaMensual(inventario);
    res.render("ventas/editarRegistro",{inventario,productos});
});

rutas.post("/modificarRegistro", async(req,res)=>{
    req.body.fechaRegistro=new Date();
    var error=await modificarRegistro(req.body);
    await sumaMensual(req.body);
    res.redirect("/inventario");
});

//---------------------------Ruta Borrar Registro----------------------------
rutas.get("/borrarRegistro/:id", verificarSesion, async(req,res)=>{
    var inventario=await buscarPorIDRegistro(req.params.id);
    await restaMensual(inventario);
    await borrarRegistro(req.params.id);
    res.redirect("/inventario");
});



//---------------------------Ruta Productos----------------------------------
rutas.get("/mostrarProductos", verificarSesion, async(req,res)=>{
    var productos = await mostrarProducto();
    res.render("producto/mostrarProductos",{productos});
});

//---------------------------Ruta Insertar Producto--------------------------
rutas.get("/insertarProducto", verificarSesion, (req,res)=>{
    res.render("producto/insertarProducto");
});

rutas.post("/insertarProducto", async(req,res)=>{
    var error=await nuevoProducto(req.body);
    res.redirect("/mostrarProductos");
});

//---------------------------Ruta Modificar Productos------------------------
rutas.get("/modificarProducto/:id", verificarSesion, async(req,res)=>{
    var product=await buscarPorIDProducto(req.params.id);
    res.render("producto/editarProducto",{product});
});

rutas.post("/modificarProducto", async(req,res)=>{
    var error=await modificarProducto(req.body);
    res.redirect("/mostrarProductos");
});

//---------------------------Ruta Borrar Productos----------------------------
rutas.get("/borrarProducto/:id", verificarSesion, async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/mostrarProductos");
});


//---------------------------Ruta Mostrar Corte-------------------------------
rutas.get("/corte", verificarSesion, async (req, res) => {
    res.render("corte/mostrarCorte", {corteMensual:{}});
});


rutas.post("/corte", async(req, res)=>{
    var corteMensual= await buscarRegistroMensual(req.body.mesCompra,req.body.anioCompra);
    res.render("corte/mostrarCorte", {corteMensual});
});


//---------------------------Ruta Salir---------------------------------------
rutas.get("/logOut",(req,res)=>{
    req.session = null;
    res.redirect("/");
});

module.exports=rutas;