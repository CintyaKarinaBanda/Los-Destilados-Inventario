document.addEventListener("DOMContentLoaded", function () {
    var selectMes = document.getElementById("mes");
    var selectAnio = document.getElementById("anio");
    var anioActual = new Date().getFullYear();

    var meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];

    // Agregar opciones al selectMes
    for (var i = 0; i < meses.length; i++) {
        var option = document.createElement("option");
        option.value = i + 1;
        option.text = meses[i];
        selectMes.appendChild(option);
    }

    // Agregar opciones al selectAnio
    for (var i = anioActual - 1; i <= anioActual + 1; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectAnio.appendChild(option);
    }

    selectAnio.value =  anioActual;
    selectMes.value = new Date().getMonth() + 1;

    // Configurar el WebSocket en el cliente
    const socket = io();

    var mesGasto=document.getElementById("mesGasto");
    var anioGasto=document.getElementById("anioGasto");
    

    // Función para enviar valores al servidor
    function enviarValoresAlServidor() {
        var valorSelect1 = selectMes.value;
        var valorSelect2 = selectAnio.value;
        mesGasto.value=selectMes.value;
        anioGasto.value=selectAnio.value;
        fetch(`/gastos?parametro1=${encodeURIComponent(valorSelect1)}&parametro2=${encodeURIComponent(valorSelect2)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`La solicitud falló con el código ${response.status}`);
                }
                return response.text();
            })
            .catch(error => console.error('Error:', error));
    }

    // Manejar actualizaciones del servidor
    socket.on('actualizarGastos', function (gastos){
        actualizarTabla(gastos);
    });

    function actualizarTabla(gastos) {
        var tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        gastos.forEach(function (gasto) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${gasto.concepto || '' }</td>
                <td>${gasto.cantidad || '' }</td>
                <td><a href="/modificarGasto/${gasto.id}">Editar</a>
                    <a href="/borrarGasto/${gasto.id}">Borrar</a>
                </td>
              `;

            tbody.appendChild(row);
        });
    }


    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.value = input.value.toUpperCase();
    });

    selectMes.addEventListener('change', enviarValoresAlServidor);
    selectAnio.addEventListener('change', enviarValoresAlServidor);

    enviarValoresAlServidor();
});
