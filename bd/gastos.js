var conexionMeses =require("./conexion").conecionMeses;
var Gasto =require("../modelo/Gasto");
var {verificarMes,buscarMes}=require("./meses");
var conexion;

async function conexionMesGasto(mes, anio){
    try {
        var resultado=await buscarMes(mes, anio);
        if (resultado!=undefined){
            conexion= await conexionMeses.doc(resultado.id).collection("gastos");
        } else{
            conexion=undefined;
        }
    } catch (error) {
        console.log("Error en la funión conexión mes: ", error);
    }
}

async function mostrarGastos() {
    var gastos=[];
    try {
        var listado = await conexion.orderBy("fechaRegistro", "desc").get();
        listado.forEach((fila) => {
            var gasto = new Gasto(fila.id, fila.data());
            if (gasto.bandera == 0) {
                gastos.push(gasto.obtenerDatos);
            }
        });
    }catch (error) {
        console.log('Error al mostrar los gastos mensuales: ', error);
    }
    return gastos;
} 

async function nuevoGasto(datos){
    var resultado= await verificarMes(datos.mesGasto,datos.anioGasto)
    var gasto=new Gasto(null,datos);    
    var error=1;
    if (gasto.bandera==0) {
        try {
            console.log(conexion);
            await conexion.doc().set(gasto.obtenerDatos);
            console.log("Se ha insertado el nuevo registro a la BD");
            bandera=1;
            error=0;
        } catch (err) {
            console.log("Error la ingresar el nuevo registro "+err);
        }
    }
    return error;
}

async function buscarPorIDGasto (id){
    var gasto;
    try {
        var docGasto=await conexion.doc(id).get();
        gastoObjeto = new Gasto(docGasto.id, docGasto.data());
        if (gastoObjeto.bandera==0) {
            gasto=gastoObjeto.obtenerDatos;
        }
    } catch (error) {
        console.log("Error al recuperar el gasto  "+error);
    }
    return gasto;
}

async function borrarGasto(id){
    var error=1;
    var gasto = await buscarPorIDGasto(id);
    if(gasto!=undefined){
        try {
            await conexion.doc(id).delete();
            console.log("Se ha borrado el registro");
            error=0;
        } catch (error) {
            console.log("Error al borrar el registro "+error);
        }
    }
    return error;
}

module.exports = {
    mostrarGastos, 
    nuevoGasto,
    buscarPorIDGasto,
    borrarGasto,
    conexionMesGasto
  };
  