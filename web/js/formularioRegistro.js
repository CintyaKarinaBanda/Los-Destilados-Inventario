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

  document.getElementById('producto').addEventListener('input', function () {
    var valorInput = this.value;
    if (valorInput !== '') {
      fetch(`/llenarDatos/${valorInput}`)
        .then(response => response.json())
        .then(data => {
          if (data != undefined) {
            document.getElementById('precio').value = data.datos.precio || '';
            document.getElementById('costo').value = data.datos.costo || '';
            document.getElementById('ganancia').value = data.datos.ganancia || '';
            document.getElementById('sujetoA').value = data.datos.sujetoA || '';
            document.getElementById('sujetoB').value = data.datos.sujetoB || '';
            document.getElementById('sujetoC').value = data.datos.sujetoC || '';
          } 
        })
        .catch(error => console.error('Error:', error));
    }
  });

  document.getElementById("formulario").addEventListener("submit", function (event) {
    var ganancia = parseFloat(document.getElementById("ganancia").value);
    var sujetoA = parseFloat(document.getElementById("sujetoA").value);
    var sujetoB = parseFloat(document.getElementById("sujetoB").value);
    var sujetoC = parseFloat(document.getElementById("sujetoC").value);
    var suma = sujetoA + sujetoB + sujetoC;
    if (suma !== ganancia) {
        event.preventDefault();
        alert("La suma de las utilidades no son correctas.");
    }
  });
  
  document.getElementById("btnVaciar").addEventListener('click', function () {
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function (input) {
      input.value = '';
    });
  });
});
