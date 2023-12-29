document.addEventListener("DOMContentLoaded", function () {
    var selectMes = document.getElementById("mesCompra");
    var selectAnio = document.getElementById("anioCompra");
    var anioActual = new Date().getFullYear();
  
    var meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];
  
    for (var i = 0; i < meses.length; i++) {
      var option = document.createElement("option");
      option.value = i + 1;
      option.text = meses[i];
      selectMes.appendChild(option);
    }
  
    for (var i = anioActual - 1; i <= anioActual + 2; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = i;
      selectAnio.appendChild(option);
    }
  
    selectAnio.value = anioActual;
    selectMes.value = new Date().getMonth() + 1;
  
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
      input.value = input.value.toUpperCase();
    });
  });
  