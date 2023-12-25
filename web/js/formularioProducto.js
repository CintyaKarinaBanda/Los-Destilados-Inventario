document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("insertarProducto").addEventListener("submit", function (event) {
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
});

