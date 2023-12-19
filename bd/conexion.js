var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys),
    appName:'LosDestilados'
});

var micuenta=admin.firestore();
var conexionInventario=micuenta.collection("inventario");
var conexionProducto=micuenta.collection("productos");

module.exports={
    conexionInventario,
    conexionProducto
}