var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys),
    databaseURL: 'https://tuproyecto.firebaseio.com',
    appName:'LosDestilados'
});

var micuenta=admin.firestore();
var conexionProducto=micuenta.collection("productos");
var conexionProductoPorCaja=micuenta.collection("productosPorCaja");
var conecionMeses=micuenta.collection("meses");

var  db = admin.database();

module.exports={
    conexionProducto,
    conecionMeses,
    conexionProductoPorCaja,
    db
}