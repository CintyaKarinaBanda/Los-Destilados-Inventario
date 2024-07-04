var rutas=require("express").Router();
var {mostrarProducto, nuevoProducto, modificarProducto, borrarProducto, buscarPorIDProducto, buscarPorNombre} = require("../bd/productobd.js");
var {nuevoRegistro, mostrarRegistro, borrarRegistro, buscarPorIDRegistro, conexionMesVenta} = require("../bd/ventas.js");
var {buscarMes,sumaMensual,restaMensual, mostrarMeses}=require("../bd/meses.js");
var {nuevoGasto, conexionMesGasto, mostrarGastos, buscarPorIDGasto, borrarGasto}=require("../bd/gastos.js");
var {mostrarProductosPoCaja, nuevoProductoPoCaja, modificarProductoPoCaja, borrarProductoPoCaja, buscarPorIDProductoPoCaja} = require("../bd/caja.js");
var {calcularSumasAnuales, obtenerEstadisticasAnuales, configurarSockets, procesarVentas}=require("../bd/funcionesEstadisticas.js");
var verificarSesion=require("../middlewares/session.js");
const { logger } = require("firebase-functions");
require('dotenv').config();


//---------------------------Ruta Ingreso------------------------------------
rutas.get("/", (req,res)=>{
    res.render("inicio");
});

rutas.post("/iniciarSesion", (req,res)=>{
    if(process.env.PASSWORD===req.body.password || process.env.PASSWORDADMIN===req.body.password){
        req.session.password = process.env.PASSWORD;
        res.redirect("/insertarRegistro");
    }  else {
        res.redirect("/")
    }
});



//---------------------------Ruta Iventario----------------------------------
rutas.get("/inventario", verificarSesion, async (req, res) => {
    var parametro1 = req.query.parametro1 || (new Date().getMonth() + 1).toString();
    var parametro2 = req.query.parametro2 || (new Date().getFullYear()).toString();
    await conexionMesVenta(parametro1, parametro2);
    var inventario = await mostrarRegistro();
    const io = req.app.get('io');
    io.emit('actualizarInventario',  inventario);
    res.render("ventas/inventario", { inventario ,parametro1, parametro2});
});



//---------------------------Ruta Insertar Registro--------------------------
rutas.get("/insertarRegistro", verificarSesion, async(req,res)=>{
    var productos = await mostrarProducto();
    var formData = {};
    res.render("ventas/insertarRegistro", { formData , productos});
});

rutas.post("/insertarRegistro", async(req,res)=>{
    var productos = await mostrarProducto();
    req.body.fechaRegistro=new Date();
    await conexionMesVenta(req.body.mesCompra, req.body.anioCompra);
    await nuevoRegistro(req.body);
    var formData = req.body;
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
    await borrarRegistro(req.body.id);
    req.body.fechaRegistro=new Date();
    var error=await nuevoRegistro(req.body);
    await sumaMensual(req.body);
    res.redirect(`/inventario?parametro1=${encodeURIComponent(req.body.mesCompra)}&parametro2=${encodeURIComponent(req.body.anioCompra)}`);
});

//---------------------------Ruta Borrar Registro----------------------------
rutas.get("/borrarRegistro/:id", verificarSesion, async(req,res)=>{
    var inventario=await buscarPorIDRegistro(req.params.id);
    await restaMensual(inventario);
    await borrarRegistro(req.params.id);
    res.redirect(`/inventario?parametro1=${encodeURIComponent(inventario.mesCompra)}&parametro2=${encodeURIComponent(inventario.anioCompra)}`);
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
    var parametro1 = req.query.parametro1 || (new Date().getMonth() + 1).toString();
    var parametro2 = req.query.parametro2 || (new Date().getFullYear()).toString();
    var corteMensual= await buscarMes(parametro1,parametro2);
    console.log(corteMensual);
    const io = req.app.get('io');
    io.emit('actualizarCorte', corteMensual);
    res.render("corte/mostrarCorte", {corteMensual});
});



//---------------------------Ruta Mostrar Gasto-------------------------------
rutas.get("/gastos", verificarSesion,async(req,res)=>{
    var parametro1 = req.query.parametro1 || (new Date().getMonth() + 1).toString();
    var parametro2 = req.query.parametro2 || (new Date().getFullYear()).toString();
    await conexionMesGasto(parametro1,parametro2);
    var gastos = await mostrarGastos();
    const io = req.app.get('io');
    var gasto={};
    io.emit('actualizarGastos', gastos);
    res.render("gastos/insertarGasto",{gastos,gasto});
});

//---------------------------Ruta Insertar Gastos------------------------------
rutas.post("/insertarGasto", async(req,res)=>{
    req.body.fechaRegistro=new Date();
    await conexionMesVenta(req.body.mes, req.body.anio);
    var error= await nuevoGasto(req.body);
    res.redirect("/gastos");
})

//---------------------------Ruta Modificar Gastos-----------------------------
rutas.get("/modificarGasto/:id", verificarSesion,async(req,res)=>{
    var gasto=await buscarPorIDGasto(req.params.id);
    res.render("gastos/editarGasto", {gasto});
});

rutas.post("/modificarGasto",async(req,res)=>{
    await borrarGasto(req.body.id);
    req.body.fechaRegistro=new Date();
    var error=await nuevoGasto(req.body);
    res.redirect('/gastos');
});

//---------------------------Ruta Modificar Gastos-----------------------------
rutas.get("/borrarGasto/:id", verificarSesion,async(req,res)=>{
    await borrarGasto(req.params.id);
    res.redirect("/gastos");
});


//---------------------------Ruta Caja----------------------------------------
rutas.get("/caja", verificarSesion, async(req,res)=>{
    var caja = await mostrarProductosPoCaja();
    res.render("caja/listadoPorCaja",{caja});
});

//---------------------------Ruta Insertar Caja-------------------------------
rutas.get("/insertarCaja", verificarSesion, (req,res)=>{
    res.render("caja/insertarCaja");
});

rutas.post("/insertarCaja", async(req,res)=>{
    var error=await nuevoProductoPoCaja(req.body);
    res.redirect("/caja");
});

//---------------------------Ruta Modificar Caja------------------------------
rutas.get("/editarCaja/:id", verificarSesion, async(req,res)=>{
    var product=await buscarPorIDProductoPoCaja(req.params.id);
    res.render("caja/editarCaja",{product});
});

rutas.post("/editarCaja", async(req,res)=>{
    var error=await modificarProductoPoCaja(req.body);
    res.redirect("/caja");
});

//---------------------------Ruta Borrar Caja----------------------------
rutas.get("/borrarProductoPorCaja/:id", verificarSesion, verificarSesion, async(req,res)=>{
    await borrarProductoPoCaja(req.params.id);
    res.redirect("/caja");
});



//---------------------------Ruta Estadisticas----------------------------------------
rutas.get("/estadisticas", verificarSesion, async (req, res) => {
    const meses = await mostrarMeses();
    const sumasAnuales = calcularSumasAnuales(meses);

    const anioActual = new Date().getFullYear().toString();
    const mesesActuales = meses.filter(mes => mes.anio === anioActual);

    const [clientesOrdenados, productosOrdenados] = await obtenerEstadisticasAnuales(anioActual);

    const io = req.app.get('io');
    configurarSockets(io);
    console.log(clientesOrdenados, productosOrdenados);
    res.render("estadisticas/mostrar", { meses: mesesActuales, sumasAnuales, clientesOrdenados, productosOrdenados });
});



//---------------------------Ruta Salir---------------------------------------
rutas.get("/logOut",(req,res)=>{
    req.session = null;
    res.redirect("/");
});

module.exports=rutas;