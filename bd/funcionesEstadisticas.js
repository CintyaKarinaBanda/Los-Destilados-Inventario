var {conexionMesVenta, mostrarRegistro} = require('./ventas');
var {mostrarMeses} = require('./meses');

function calcularSumasAnuales(meses) {
    return meses.reduce((sumasAnuales, mes) => {
        const anio = mes.anio;
        const sumaGanancia = parseFloat(mes.sumaGanancia);
        sumasAnuales[anio] = (sumasAnuales[anio] || 0) + sumaGanancia;
        return sumasAnuales;
    }, {});
}

async function obtenerEstadisticasAnuales(anio) {
    const listaClientes = {};
    const listaProductos = {};

    await Promise.all([...Array(12).keys()].map(async mes => {
        try {
            const conexion = await conexionMesVenta((mes + 1).toString(), anio);
            if (conexion) {
                const inventario = await mostrarRegistro();
                procesarVentas(inventario, listaClientes, listaProductos);
            }
        } catch (error) {
            console.error(`Error al procesar el mes ${mes + 1}:`, error);
        }
    }));

    const clientesOrdenados = Object.entries(listaClientes);
    clientesOrdenados.sort((a, b) => b[1].contador - a[1].contador);
    const productosOrdenados = Object.entries(listaProductos);
    productosOrdenados.sort((a, b) => b[1] - a[1]);

    return [clientesOrdenados, productosOrdenados];
}

function procesarVentas(inventario, listaClientes, listaProductos) {
    inventario.forEach(venta => {
        const cliente = venta.nombreCliente;
        const noNota = venta.noNota;

        if (!(cliente in listaClientes)) {
            listaClientes[cliente] = { notas: new Set(), contador: 0 };
        }
        if (!listaClientes[cliente].notas.has(noNota)) {
            listaClientes[cliente].notas.add(noNota);
            listaClientes[cliente].contador += 1;
        }

        listaProductos[venta.producto] = (listaProductos[venta.producto] || 0) + 1;
    });
}

function configurarSockets(io) {
    io.on('connection', socket => {
        socket.on('cambiarAnio', async anio => {
            try {
                const meses = await mostrarMeses();
                const mesesFiltrados = meses.filter(mes => mes.anio === anio);
                socket.emit('actualizarEstadistica', mesesFiltrados);
            } catch (error) {
                console.error(`Error al cambiar el año a ${anio}:`, error);
            }
        });

        socket.on('cambiarAnioTabla', async anio => {
            try {
                const [listaClientes, listaProductos] = await obtenerEstadisticasAnuales(anio);
                socket.emit('actualizarTablas', { listaClientes, listaProductos });
            } catch (error) {
                console.error(`Error al cambiar el año de la tabla a ${anio}:`, error);
            }
        });
    });
}

module.exports = {
    calcularSumasAnuales,
    obtenerEstadisticasAnuales,
    configurarSockets,
    procesarVentas,
  };