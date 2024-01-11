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
            console.log("Se creo un nuevo Registro Mensual verificarMes()");
            resultadoBusqueda = await buscarMes(mes, anio);
        } 
    } catch (error) {
        console.log("Error al recuperar el resgistro mensual: verificarMes() " + error);
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
            console.log("Registro mensual recuperado buscarMes()");
        }
    } catch (error) {
        console.log("Error al recuperar el registro mensual: buscarMes() ",error);
    }
    return resultado;
}

async function actualizarCorteMensual(datos, operacion) {
    var error = 0;
    try {
        var resBuscar = await verificarMes(datos.mesCompra, datos.anioCompra);
        if (resBuscar) {
            const parseFloatAndFix = (value) => parseFloat(value).toFixed(2);
            resBuscar.sumaPrecio = operacion(parseFloatAndFix(resBuscar.sumaPrecio), parseFloatAndFix(datos.precio));
            resBuscar.sumaCosto = operacion(parseFloatAndFix(resBuscar.sumaCosto), parseFloatAndFix(datos.costo));
            resBuscar.sumaGanancia = operacion(parseFloatAndFix(resBuscar.sumaGanancia), parseFloatAndFix(datos.ganancia));
            resBuscar.sumaSujetoA = operacion(parseFloatAndFix(resBuscar.sumaSujetoA), parseFloatAndFix(datos.sujetoA));
            resBuscar.sumaSujetoB = operacion(parseFloatAndFix(resBuscar.sumaSujetoB), parseFloatAndFix(datos.sujetoB));
            resBuscar.sumaSujetoC = operacion(parseFloatAndFix(resBuscar.sumaSujetoC), parseFloatAndFix(datos.sujetoC));
            var corteMensual = new Mes(resBuscar.id, resBuscar);
            if (corteMensual.bandera === 0) {
                await conexion.doc(corteMensual.id).set(corteMensual.obtenerDatos);
                console.log("Corte Mensual Actualizado");
            }
        }
    } catch (err) {
        console.log("Error al modificar las cantidades del corte mensual: ", err);
        error = 1;
    }

    return error;
}

async function sumaMensual(datos) {
    return actualizarCorteMensual(datos, (a, b) => parseFloat(a) + parseFloat(b));
}

async function restaMensual(datos) {
    return actualizarCorteMensual(datos, (a, b) => parseFloat(a)-parseFloat(b));
}


module.exports={
    verificarMes,
    restaMensual,
    sumaMensual,
    buscarMes
}