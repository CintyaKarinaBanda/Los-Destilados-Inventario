var conexionMeses =require("../bd/conexion").conecionMeses;
const fs = require('fs').promises;

async function descargarDatos() {
  const datos = {};

  // Obtener todos los documentos de la colección principal
  const querySnapshotPrincipal = await conexionMeses.get();

  // Iterar sobre los documentos de la colección principal
  await Promise.all(querySnapshotPrincipal.docs.map(async (docPrincipal) => {
    const idDocumentoPrincipal = docPrincipal.id;

    // Inicializar el objeto de datos para el documento principal
    datos[idDocumentoPrincipal] = {
      datosPrincipal: {
        ...docPrincipal.data(),
        fechaRegistro: convertirAFecha(docPrincipal.data().fechaRegistro)
      },
      ventas: [],
      gastos: []
    };

    // Obtener datos de la primera subcolección
    const querySnapshotSubcoleccion1 = await conexionMeses.doc(idDocumentoPrincipal).collection('ventas').get();

    // Iterar sobre los documentos de la primera subcolección y agregarlos al objeto de datos
    querySnapshotSubcoleccion1.forEach((docSubcoleccion1) => {
      datos[idDocumentoPrincipal].ventas.push({
        id: docSubcoleccion1.id,
        data: {
          ...docSubcoleccion1.data(),
          fechaRegistro: convertirAFecha(docSubcoleccion1.data().fechaRegistro)
        }
      });
    });

    // Obtener datos de la segunda subcolección
    const querySnapshotSubcoleccion2 = await conexionMeses.doc(idDocumentoPrincipal).collection('gastos').get();

    // Iterar sobre los documentos de la segunda subcolección y agregarlos al objeto de datos
    querySnapshotSubcoleccion2.forEach((docSubcoleccion2) => {
      datos[idDocumentoPrincipal].gastos.push({
        id: docSubcoleccion2.id,
        data: {
          ...docSubcoleccion2.data(),
          fechaRegistro: convertirAFecha(docSubcoleccion2.data().fechaRegistro)
        }
      });
    });
  }));

  // Descargar los datos como JSON
  const jsonString = JSON.stringify(datos, null, 2);

  // Escribir los datos en un archivo de forma asíncrona
  try {
    await fs.writeFile('datos.json', jsonString);
    console.log('Datos guardados en datos.json');
  } catch (error) {
    console.error('Error al escribir el archivo:', error);
  }
}

function convertirAFecha(timestamp) {
  if (timestamp && timestamp._seconds && timestamp._nanoseconds) {
    return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
  } else {
    // Manejar el caso en el que la fecha no está presente o no es válida
    return null; // o proporciona otro valor predeterminado si lo prefieres
  }
}

// Llama a la función para iniciar la descarga
descargarDatos();
