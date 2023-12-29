var conexion =require("./conexion").conexionInventario;
var Registro =require("../modelo/Registro");

/*async function mostrarRegistro() {
    var registros = [];
    try {
        var inventario = await conexion.get();
        inventario.forEach((venta) => {
            var registro = new Registro(venta.id, venta.data());
            if (registro.bandera == 0) {
                registros.push(registro.obtenerDatos);
            }
        });
    } catch (error) {
        console.log("Error al recuperar registro en la BD "+error);
    }
    return registros;
}*/

async function mostrarRegistro() {
    var registros = [];
    try {
        var inventario = await conexion.orderBy("fechaRegistro", "desc").get();
        inventario.forEach((venta) => {
            var registro = new Registro(venta.id, venta.data());
            if (registro.bandera == 0) {
                registros.push(registro.obtenerDatos);
            }
        });

    } catch (error) {
        console.log("Error al recuperar registro en la BD " + error);
    }
    console.log(registros);
    return registros;
}



async function nuevoRegistro(datos){
    var registro=new Registro(null,datos);
    var error=1;
    if (registro.bandera==0) {
        try {
            await conexion.doc().set(registro.obtenerDatos);
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

/*async function buscarPorNombre(nombre) {
    var product={};
    try {
        var productoSnap = await conexion.where('nombre', '==', nombre).get();
        var productoDoc = productoSnap.docs[0];
        var productoObjeto = new Registro(productoDoc.id, productoDoc.data());
        if (productoObjeto.bandera === 0) {
            product = productoObjeto.obtenerDatos;
        } 
    } catch (error) {
        console.log("Error al recuperar los productos " + error);
    }
    console.log(product);
    return product;
}*/

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
    borrarRegistro
  };