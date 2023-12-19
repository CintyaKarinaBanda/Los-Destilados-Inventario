var rutas=require("express").Router();
var {nuevoProducto}=require("../bd/productobd");

//---------------------------Ruta Ingreso------------------------------------
rutas.get("/", (req,res)=>{
    res.render("inicio");
});

//---------------------------Ruta Insertar Registro--------------------------
rutas.get("/insertarRegistro", (req,res)=>{
    res.render("insertarRegistro");
});

//---------------------------Ruta Iventario----------------------------------
rutas.get("/inventario", (req,res)=>{
    res.render("inventario");
});

//---------------------------Ruta Insertar Producto--------------------------
rutas.get("/insertarProducto", (req,res)=>{
    res.render("producto/insertarProducto");
});

rutas.post("/insertarProducto", async(req,res)=>{
    var error=await nuevoProducto(req.body);
    res.redirect("/");
});

//---------------------------Ruta Productos----------------------------------
rutas.get("/mostrarProductos", (req,res)=>{
    res.render("producto/mostrarProductos");
});

module.exports=rutas;