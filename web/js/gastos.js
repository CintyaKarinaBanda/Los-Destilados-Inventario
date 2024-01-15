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

    var valueMes=document.getElementById("valueMes");
    var valueAnio=document.getElementById("valueAnio");
    selectAnio.value = valueAnio.value || anioActual;
    selectMes.value = valueMes.value || new Date().getMonth() + 1;

    // Configurar el WebSocket en el cliente
    const socket = io();

    // Función para enviar valores al servidor
    function enviarValoresAlServidor() {
        var valorSelect1 = selectMes.value;
        var valorSelect2 = selectAnio.value;
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
    socket.on('actualizarInventario', function (inventario){
        actualizarTabla(inventario);
    });

    function actualizarTabla(inventario) {
        valueAnio.value = inventario.anioCompra;
        valueMes.value = inventario.mesCompra;
        var tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        inventario.forEach(function (registro) {
            var row = document.createElement('tr');
            row.innerHTML = `
                  <td>${registro.noNota}</td>
                  <td>${registro.nombreCliente}</td>
                  <td>${registro.producto}</td>
                  <td>${registro.codigoQR}</td>
                  <td>${registro.diaCompra} / ${registro.mesCompra} / ${registro.anioCompra}</td>
                  <td>
                      <a href="/modificarRegistro/${registro.id}">Editar</a>
                      <a href="/borrarRegistro/${registro.id}">Borrar</a>
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
