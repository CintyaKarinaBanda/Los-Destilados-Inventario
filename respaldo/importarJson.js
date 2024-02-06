const admin = require("firebase-admin");
const keys = require("../keys.json");
const fs = require('fs');

admin.initializeApp({
    credential: admin.credential.cert(keys),
    appName: 'LosDestilados'
});

const conexionMeses = admin.firestore().collection('mes');

const rutaDatos = 'C:\\Users\\karib\\OneDrive\\Escritorio\\LosDestilados\\respaldo\\datos.json';

// Lee el contenido del archivo JSON
const datos = JSON.parse(fs.readFileSync(rutaDatos, 'utf8'));

Object.keys(datos).forEach(async (documentoId) => {
    const documentoDatos = datos[documentoId];

    // Convertir la fecha de registro a timestamp
    if (documentoDatos.datosPrincipal.fechaRegistro) {
        documentoDatos.datosPrincipal.fechaRegistro = admin.firestore.Timestamp.fromDate(new Date(documentoDatos.datosPrincipal.fechaRegistro));
    }

    // Inserta datos principales en la colección principal
    await conexionMeses.doc(documentoId).set(documentoDatos.datosPrincipal);

    // Inserta las ventas en la subcolección "ventas"
    await Promise.all(documentoDatos.ventas.map(async (venta) => {
        if (venta.data.fechaRegistro) {
            venta.data.fechaRegistro = admin.firestore.Timestamp.fromDate(new Date(venta.data.fechaRegistro));
        }
        await conexionMeses.doc(documentoId).collection('ventas').doc(venta.id).set(venta.data);
    }));

    // Inserta los gastos en la subcolección "gastos"
    await Promise.all(documentoDatos.gastos.map(async (gasto) => {
        if (gasto.data.fechaRegistro) {
            gasto.data.fechaRegistro = admin.firestore.Timestamp.fromDate(new Date(gasto.data.fechaRegistro));
        }
        await conexionMeses.doc(documentoId).collection('gastos').doc(gasto.id).set(gasto.data);
    }));
});

console.log('Datos insertados exitosamente en Firestore.');
