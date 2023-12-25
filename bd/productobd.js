var conexion =require("./conexion").conexionProducto;
var Producto =require("../modelo/Producto");

async function mostrarProducto() {
    var products = [];
    try {
        var productos = await conexion.get();
        productos.forEach((producto) => {
            var product = new Producto(producto.id, producto.data());
            if (product.bandera == 0) {
                products.push(product.obtenerDatos);
            }
        });
    } catch (error) {
        console.log("Error al recuperar productos en la BD "+error);
    }
    return products;
}

async function nuevoProducto(datos){
    var product=new Producto(null,datos);
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

async function buscarPorIDProducto (id){
    var product;
    try {
        var producto=await conexion.doc(id).get();
        productoObjeto = new Producto(producto.id, producto.data());
        if (productoObjeto.bandera==0) {
            product=productoObjeto.obtenerDatos;
        }
    } catch (error) {
        console.log("Error al recuperar los productos  "+error);
    }
    return product;
}

async function buscarPorNombre(nombre) {
    var product={};
    try {
        var productoSnap = await conexion.where('nombre', '==', nombre).get();
        var productoDoc = productoSnap.docs[0];
        var productoObjeto = new Producto(productoDoc.id, productoDoc.data());
        if (productoObjeto.bandera === 0) {
            product = productoObjeto.obtenerDatos;
        } 
    } catch (error) {
        console.log("Error al recuperar los productos " + error);
    }
    return product;
}


async function modificarProducto(datos){
    var error=1;
    var resBuscar = await buscarPorIDProducto(datos.id);
    if(resBuscar!=undefined){
        var product=new Producto(datos.id,datos);
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

async function borrarProducto(id){
    var error=1;
    var user = await buscarPorIDProducto(id);
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
    mostrarProducto, 
    nuevoProducto,
    buscarPorIDProducto,
    modificarProducto,
    borrarProducto,
    buscarPorNombre
  };