var rutas=require("express").Router();
var {mostrarProducto, nuevoProducto, modificarProducto, borrarProducto, buscarPorID, buscarPorNombre} = require("../bd/productobd.js");

//---------------------------Ruta Ingreso------------------------------------
rutas.get("/", (req,res)=>{
    res.render("inicio");
});

//---------------------------Ruta Iventario----------------------------------
rutas.get("/inventario", (req,res)=>{
    res.render("inventario");
});

//---------------------------Ruta Insertar Registro--------------------------
rutas.get("/insertarRegistro", async(req,res)=>{
    var productos = await mostrarProducto();
    const formData = req.body || {};
    res.render("insertarRegistro", { formData , productos});
});

rutas.post("/insertarRegistro", async(req,res)=>{
    var productos = await mostrarProducto();
    //var error=await nuevoRegistro(req.body);
    const formData = req.body || {};
    res.render("insertarRegistro", { formData , productos});
});

rutas.get('/llenarDatos/:valor', async (req, res) => {
    var nombreProducto = req.params.valor;
    var product = await buscarPorNombre(nombreProducto);
    res.json({ datos: product });

})


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
    var product=await buscarPorID(req.params.id);
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



module.exports=rutas;