var conexion = require("./conexion").conexionProducto;
var Producto = require("../modelo/Producto");

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

module.exports = {
    nuevoProducto
  };