var rutas=require("express").Router();
var {mostrarProducto, nuevoProducto, modificarProducto, borrarProducto, buscarPorIDProducto, buscarPorNombre} = require("../bd/productobd.js");
var {nuevoRegistro, mostrarRegistro, borrarRegistro, modificarRegistro, buscarPorIDRegistro} = require("../bd/registro.js");
var {buscarRegistroMensual}=require("../bd/mes.js");

//---------------------------Ruta Ingreso------------------------------------
rutas.get("/", (req,res)=>{
    res.render("inicio");
});

rutas.post("/iniciarSesion",(req,res)=>{
    res.redirect("/insertarRegistro");
});


//---------------------------Ruta Iventario----------------------------------
rutas.get("/inventario", async(req,res)=>{
    var inventario = await mostrarRegistro();
    res.render("ventas/inventario",{inventario});
});

//---------------------------Ruta Insertar Registro--------------------------
rutas.get("/insertarRegistro", async(req,res)=>{
    var productos = await mostrarProducto();
    const formData = req.body || {};
    res.render("ventas/insertarRegistro", { formData , productos});
});

rutas.post("/insertarRegistro", async(req,res)=>{
    var productos = await mostrarProducto();
    req.body.fechaRegistro=new Date();
    var error=await nuevoRegistro(req.body);
    const formData = req.body;
    res.render("ventas/insertarRegistro", { formData , productos});
});

rutas.get('/llenarDatos/:valor', async (req, res) => {
    var nombreProducto = req.params.valor;
    var product = await buscarPorNombre(nombreProducto);
    res.json({ datos: product });
}) 

//---------------------------Ruta Modificar Registro------------------------
rutas.get("/modificarRegistro/:id",async(req,res)=>{
    var productos = await mostrarProducto();
    var inventario=await buscarPorIDRegistro(req.params.id);
    res.render("ventas/editarRegistro",{inventario,productos});
});

rutas.post("/modificarRegistro", async(req,res)=>{
    req.body.fechaRegistro=new Date();
    var error=await modificarRegistro(req.body);
    res.redirect("/inventario");
});

//---------------------------Ruta Borrar Registro----------------------------
rutas.get("/borrarRegistro/:id",async(req,res)=>{
    await borrarRegistro(req.params.id);
    res.redirect("/inventario");
});



//---------------------------Ruta Productos----------------------------------
rutas.get("/mostrarProductos", async(req,res)=>{
    var productos = await mostrarProducto();
    res.render("producto/mostrarProductos",{productos});
});

//---------------------------Ruta Insertar Producto--------------------------
rutas.get("/insertarProducto", (req,res)=>{
    res.render("producto/insertarProducto");
});

rutas.post("/insertarProducto", async(req,res)=>{
    var error=await nuevoProducto(req.body);
    res.redirect("/mostrarProductos");
});

//---------------------------Ruta Modificar Productos------------------------
rutas.get("/modificarProducto/:id",async(req,res)=>{
    var product=await buscarPorIDProducto(req.params.id);
    res.render("producto/editarProducto",{product});
});

rutas.post("/modificarProducto", async(req,res)=>{
    var error=await modificarProducto(req.body);
    res.redirect("/mostrarProductos");
});

//---------------------------Ruta Borrar Productos----------------------------
rutas.get("/borrarProducto/:id",async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/mostrarProductos");
});


//---------------------------Ruta Mostrar Corte-------------------------------
rutas.get("/corte",async(req,res)=>{
    await buscarRegistroMensual("12","2023");
    res.render("corte/mostrarCorte");
});


//---------------------------Ruta Salir---------------------------------------
rutas.get("/logOut",(req,res)=>{
    res.redirect("/");
});

module.exports=rutas;