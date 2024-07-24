var conexion =require("./conexion").conexionProductoPorCaja;
var Caja =require("../modelo/Caja");

async function mostrarProductosPoCaja() {
    var products = [];
    try {
        var productos = await conexion.get();
        productos.forEach((producto) => {
            var product = new Caja(producto.id, producto.data());
            if (product.bandera == 0) {
                products.push(product.obtenerDatos);
            }
        });

        products.sort((a, b) => {
            if (a.destilado < b.destilado) return -1;
            if (a.destilado > b.destilado) return 1;
            return 0;
        });

    } catch (error) {
        console.log("Error al recuperar productos en la BD "+error);
    }
    return products;
}

async function nuevoProductoPoCaja(datos){
    var product=new Caja(null,datos);
    var error=1;
    if (product.bandera==0) {
        try {
            await conexion.doc().set(product.obtenerDatos);
            console.log("Se ha insertado el nuevo producto a la BD");
            bandera=1;
            error=0;
        } catch (err) {
            console.log("Error la ingresar el nuevo producto "+err);
        }
    }
    return error;
}

async function buscarPorIDProductoPoCaja (id){
    var product;
    try {
        var producto=await conexion.doc(id).get();
        productoObjeto = new Caja(producto.id, producto.data());
        if (productoObjeto.bandera==0) {
            product=productoObjeto.obtenerDatos;
        }
    } catch (error) {
        console.log("Error al recuperar el producto: "+error);
    }
    return product;
}

async function modificarProductoPoCaja(datos){
    var error=1;
    var resBuscar = await buscarPorIDProductoPoCaja(datos.id);
    if(resBuscar!=undefined){
        var product=new Caja(datos.id,datos);
        if (product.bandera==0) {
            try {
                await conexion.doc(product.id).set(product.obtenerDatos);
                console.log("Registro modificado");
                error=0;
            } catch (err) {
                console.log("Error la modificar el producto "+err);
            }
        }
    }
    return error;
}

async function borrarProductoPoCaja(id){
    var error=1;
    var user = await buscarPorIDProductoPoCaja(id);
    if(user!=undefined){
        try {
            await conexion.doc(id).delete();
            console.log("Se ha borrado el producto");
            error=0;
        } catch (error) {
            console.log("Error al borrar el producto "+error);
        }
    }
    return error;
}

module.exports = {
    mostrarProductosPoCaja, 
    nuevoProductoPoCaja,
    buscarPorIDProductoPoCaja,
    modificarProductoPoCaja,
    borrarProductoPoCaja
  };