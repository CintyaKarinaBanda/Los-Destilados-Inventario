var db = require("../bd/conexion");
const fs = require('fs');
const cron = require('cron');



var ref = db.ref('ventas');

function guardarDatosComoJSON() {
  ref.once('value', (snapshot) => {
    const datos = snapshot.val();

    Object.keys(datos).forEach((id) => {
      if (datos[id].subcoleccion) {
        datos[id].subcoleccion = datos[id].subcoleccion;
      }
    });

    const datosJSON = JSON.stringify(datos, null, 2);

    fs.writeFileSync('datos.json', datosJSON);

    console.log('Datos guardados en datos.json');
  }, (errorObject) => {
    console.error('Error al leer datos: ' + errorObject.code);
  });
}

// Configura una tarea cron para ejecutar la función cada quince días
const tareaCron = new cron.CronJob('0 3 */15 * *', () => {
  guardarDatosComoJSON();
});

// Inicia la tarea cron
tareaCron.start();

