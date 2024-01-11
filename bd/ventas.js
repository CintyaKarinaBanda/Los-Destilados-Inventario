var conexionMeses =require("./conexion").conecionMeses;
var Registro =require("../modelo/Registro");
var {verificarMes,buscarMes}=require("./meses");
var conexion;

async function conexionMes(mes, anio){
    try {
        var resultado=await buscarMes(mes, anio);
        if (resultado!=undefined){
            conexion= await conexionMeses.doc(resultado.id).collection("ventas");
        } else{
            conexion=undefined;
        }
    } catch (error) {
        console.log("Error en la funión conexión mes: ", error);
    }
}

async function cambiarMes(mes, anio){
    
}

async function mostrarRegistro() {
    var registros=[];
    try {
        var inventario = await conexion.orderBy("fechaRegistro", "desc").get();
        inventario.forEach((venta) => {
            var registro = new Registro(venta.id, venta.data());
            if (registro.bandera == 0) {
                registros.push(registro.obtenerDatos);
            }
        });
    }catch (error) {
        console.log('Error al mostrar el inventario mensual: ', error);
    }
    return registros;
} 

async function nuevoRegistro(datos){
    var resultado= await verificarMes(datos.mesCompra,datos.anioCompra)
    var registro=new Registro(null,datos);
    var error=1;
    if (registro.bandera==0) {
        try {
            await conexionMeses.doc(resultado.id).collection("ventas").doc().set(registro.obtenerDatos);
            console.log("Se ha insertado el nuevo registro a la BD");
            bandera=1;
            error=0;
        } catch (err) {
            console.log("Error la ingresar el nuevo registro "+err);
        }
    }
    return error;
}

async function buscarPorIDRegistro (id){
    var registro;
    try {
        var venta=await conexion.doc(id).get();
        ventaObjeto = new Registro(venta.id, venta.data());
        if (ventaObjeto.bandera==0) {
            registro=ventaObjeto.obtenerDatos;
        }
    } catch (error) {
        console.log("Error al recuperar el registro  "+error);
    }
    return registro;
}

async function modificarRegistro(datos){
    var error=1;
    var resBuscar = await buscarPorIDRegistro(datos.id);
    if(resBuscar!=undefined){
        var registro=new Registro(datos.id,datos);
        if (registro.bandera==0) {
            try {
                await conexion.doc(registro.id).set(registro.obtenerDatos);
                console.log("Registro modificado");
                error=0;
            } catch (err) {
                console.log("Error en la modificar el registro "+err);
            }
        }
    }
    return error;
}

async function borrarRegistro(id){
    var error=1;
    var registro = await buscarPorIDRegistro(id);
    if(registro!=undefined){
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
    mostrarRegistro, 
    nuevoRegistro,
    buscarPorIDRegistro,
    modificarRegistro,
    borrarRegistro,
    conexionMes
  };