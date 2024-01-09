document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("productoFomulario").addEventListener("submit", function (event) {
        var ganancia = parseFloat(document.getElementById("ganancia").value);
        var sujetoA = parseFloat(document.getElementById("sujetoA").value);
        var sujetoB = parseFloat(document.getElementById("sujetoB").value);
        var sujetoC = parseFloat(document.getElementById("sujetoC").value);
        var suma = parseFloat(sujetoA + sujetoB + sujetoC);
        let tolerancia=parseFloat(0.1);
        if ( (ganancia-suma) > tolerancia) {
            event.preventDefault();
            alert("La suma de las utilidades no es correctas.");
        }
        document.getElementById("nombre").value = document.getElementById("nombre").value.toUpperCase();
    });
});

