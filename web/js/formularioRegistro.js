import { buscarPorNombre, mostrarProducto } from '../../bd/productobd.js';

document.addEventListener("DOMContentLoaded", function () {
  var selectMes = document.getElementById("mesCompra");
  var selectAnio = document.getElementById("anioCompra");
  var meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  for (var i = 0; i < meses.length; i++) {
    var option = document.createElement("option");
    option.value = i + 1;
    option.text = meses[i];
    selectMes.appendChild(option);
  }

  var anioActual = new Date().getFullYear();
  for (var i = anioActual - 1; i <= anioActual + 2; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectAnio.appendChild(option);
  }

  selectAnio.value = anioActual;
  selectMes.value = new Date().getMonth() + 1;

  document.getElementById('producto').addEventListener('input', async function () {
    var valorInput = this.value;
    var productos = await mostrarProducto();

    for (const productoNombre of productos) {
        if (valorInput === productoNombre) {
            var product = await buscarPorNombre(productoNombre);
            var precio = document.getElementById("precio");
            var costo = document.getElementById("costo");
            var ganancia = document.getElementById("ganancia");
            precio.value = product.precio || '';
            costo.value = product.costo || '';
            ganancia.value = product.ganancia || '';
            break;
        }
    }
  });
});
