var conexion =require("./conexion").conexionMensual;
var functions = require('firebase-functions');
var CorteMensual =require("../modelo/CorteMensual");

exports.crearNuevoMes = functions.pubsub.schedule('0 0 1 * *').timeZone('America/New_York').onRun(async (context) => {
    const ahora = admin.firestore.Timestamp.now();
    const fecha = admin.firestore.Timestamp.fromDate(new Date(ahora.toMillis()));

    const mesActual = fecha.toDate().getMonth() + 1; // El mes en JavaScript es 0 indexado
    const anioActual = fecha.toDate().getFullYear();

    const registroMensualRef = admin.conexion.where('mes', '==', mesActual).where('anio', '==', anioActual);

    const snapshot = await registroMensualRef.get();

    if (snapshot.empty) {
        // No existe un registro para este mes, así que lo creamos
        await conexion.add({
            anio: anioActual,
            mes: mesActual,
            totalGanancias: 0,
            totalGastos: 0,
            saldoMensual: 0
        });
    }

    return null;
});

async function buscarRegistroMensual(mes, anio){
    var resultadoBusqueda={};
    try {
        var busquedaSnap = await conexion.where('mes', '==', mes).where("anio", '==', anio).get();
        var busquedaDoc = busquedaSnap.docs[0];
        var busquedaObjeto = new CorteMensual (busquedaDoc.id, busquedaDoc.data());
        if (busquedaObjeto.bandera === 0) {
            resultadoBusqueda = busquedaDoc;
        } 
    } catch (error) {
        console.log("Error al recuperar el resgistro mensual " + error);
    }
    return resultadoBusqueda;
}

async function sumaMensual(datos){
    var error=1;
    var resBuscar = await buscarRegistroMensual(datos.mes,datos.anio);
    if(resBuscar!=undefined){
        resBuscar.sumaPrecio+=datos.precio;
        resBuscar.sumaCosto=datos.costo;
        resBuscar.sumaGanancia=datos.ganancia;
        resBuscar.sumaSujetoA=datos.sujetoA;
        resBuscar.sumaSujetoB=datos.sujetoB;
        resBuscar.sumaSujetoC=datos.sujetoC;
        var corteMensual=new CorteMensual(resBuscar.id,resBuscar);
        if (corteMensual.bandera==0) {
            try {
                await conexion.doc(corteMensual.id).set(corteMensual.obtenerDatos);
                console.log("Corte Mensual Actualizado");
                error=0;
            } catch (err) {
                console.log("Error la modificar la suma del corte mensual "+err);
            }
        }
    }
    return error;
}

module.exports={
    buscarRegistroMensual,
    sumaMensual
}