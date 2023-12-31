var conexion =require("./conexion").conecionMeses;
var Mes =require("../modelo/Meses");

async function verificarMes(mes, anio){
    var resultadoBusqueda={};
    try {
        resultadoBusqueda = await buscarMes(mes, anio);
        if(resultadoBusqueda==undefined){
            await conexion.add({
                mes: mes,
                anio: anio,
                sumaPrecio: 0,
                sumaCosto: 0,
                sumaGanancia: 0,
                sumaSujetoA: 0,
                sumaSujetoB: 0,
                sumaSujetoC: 0
            });
            resultadoBusqueda = await buscarMes(mes, anio);
        } 
    } catch (error) {
        console.log("Error al recuperar el resgistro mensual " + error);
    }
    return resultadoBusqueda;
}

async function buscarMes(mes, anio){
    var resultado;
    try {
        var mesSnap= await conexion.where('mes', '==', mes).where("anio", '==', anio).get();
        var mesDoc= await mesSnap.docs[0];
        if(mesDoc!=undefined){
            mesObjeto = new Mes(mesDoc.id, mesDoc.data());
            if (mesObjeto.bandera==0) {
                resultado=mesObjeto.obtenerDatos;
            }
        }
    } catch (error) {
        console.log("Error el buscar el mes: ",error);
    }
    return resultado;
}

async function actualizarCorteMensual(datos, operacion) {
    var error = 0;

    try {
        var resBuscar = await verificarMes(datos.mesCompra, datos.anioCompra);

        if (resBuscar) {
            const parseFloatAndFix = (value) => parseFloat(value).toFixed(4);

            resBuscar.sumaPrecio = operacion(resBuscar.sumaPrecio, parseFloatAndFix(datos.precio));
            resBuscar.sumaCosto = operacion(resBuscar.sumaCosto, parseFloatAndFix(datos.costo));
            resBuscar.sumaGanancia = operacion(resBuscar.sumaGanancia, parseFloatAndFix(datos.ganancia));
            resBuscar.sumaSujetoA = operacion(resBuscar.sumaSujetoA, parseFloatAndFix(datos.sujetoA));
            resBuscar.sumaSujetoB = operacion(resBuscar.sumaSujetoB, parseFloatAndFix(datos.sujetoB));
            resBuscar.sumaSujetoC = operacion(resBuscar.sumaSujetoC, parseFloatAndFix(datos.sujetoC));

            var corteMensual = new Mes(resBuscar.id, resBuscar);

            if (corteMensual.bandera === 0) {
                await conexion.doc(corteMensual.id).set(corteMensual.obtenerDatos);
                console.log("Corte Mensual Actualizado");
            }
        }
    } catch (err) {
        console.log("Error al modificar la suma del corte mensual: ", err);
        error = 1;
    }

    return error;
}

async function sumaMensual(datos) {
    return actualizarCorteMensual(datos, (a, b) => a + b);
}

async function restaMensual(datos) {
    return actualizarCorteMensual(datos, (a, b) => a - b);
}


module.exports={
    verificarMes,
    restaMensual,
    sumaMensual,
    buscarMes
}