document.addEventListener("DOMContentLoaded", function () {
    var selectMes = document.getElementById("mesCompra");
    var selectAnio = document.getElementById("anioCompra");
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

    selectAnio.value = anioActual;
    selectMes.value = (new Date().getMonth() + 1);

    // Configurar el WebSocket en el cliente
    const socket = io();

    // Función para enviar valores al servidor
    function enviarValoresAlServidor() {
        var valorSelect1 = selectMes.value;
        var valorSelect2 = selectAnio.value;
        fetch(`/corte?parametro1=${encodeURIComponent(valorSelect1)}&parametro2=${encodeURIComponent(valorSelect2)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`La solicitud falló con el código ${response.status}`);
                }
                return response.text();
            })
            .catch(error => console.error('Error:', error));
    }

    // Manejar actualizaciones del servidor
    socket.on('actualizarCorte', function (corte) {
        actualizarTabla(corte);
    });

    function actualizarTabla(corte) {
        var tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>$ ${ corte ? corte.sumaPrecio : "" }</td>
            <td>$ ${ corte ? corte.sumaCosto : "" }</td>                    
            <td>$ ${ corte ? corte.sumaGanancia : "" }</td>
            <td>$ ${ corte ? corte.sumaSujetoA : "" }</td>
            <td>$ ${ corte ? corte.sumaSujetoB : "" }</td>
            <td>$ ${ corte ? corte.sumaSujetoC : "" }</td>
        `;
        tbody.appendChild(row);
    }

    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.value = input.value.toUpperCase();
    });

    selectMes.addEventListener('change', enviarValoresAlServidor);
    selectAnio.addEventListener('change', enviarValoresAlServidor);
    enviarValoresAlServidor();
});
