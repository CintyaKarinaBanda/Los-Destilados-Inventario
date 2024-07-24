document.getElementById("anadirProducto").addEventListener("click", () => {
    const productosDiv = document.getElementById("productos");

    const inputsDiv = document.createElement("div");
    inputsDiv.classList.add("inputs-div", "mb-3");

    // Primer DIV
    const primerDiv = document.createElement("div");
    primerDiv.classList.add("d-flex");

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.classList.add("btn", "btn-danger", "btn-sm", 'mb-3');
    eliminarButton.style.marginRight = "1rem"; 
    eliminarButton.addEventListener("click", () => { productosDiv.removeChild(inputsDiv); });

    const productInput = document.createElement("input");
    productInput.type = "text";
    productInput.name = "producto";
    productInput.classList.add("form-control", "mb-3");
    productInput.placeholder = "Producto";

    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.name = "cantidad";
    quantityInput.classList.add("form-control", "mb-3");
    quantityInput.placeholder = "Cantidad de botellas";

    primerDiv.appendChild(eliminarButton);
    primerDiv.appendChild(productInput);
    primerDiv.appendChild(quantityInput);

    // Segunda DIV
    const segundoDiv = document.createElement("div");
    segundoDiv.classList.add("d-flex");

    const precioInput = document.createElement("input");
    precioInput.type = "text";
    precioInput.name = "precio";
    precioInput.classList.add("form-control", "mb-3");
    precioInput.placeholder = "Precio";

    const costoInput = document.createElement("input");
    costoInput.type = "text";
    costoInput.name = "costo";
    costoInput.classList.add("form-control", "mb-3");
    costoInput.placeholder = "Costo";

    const gananciaInput = document.createElement("input");
    gananciaInput.type = "text";
    gananciaInput.name = "ganancia";
    gananciaInput.classList.add("form-control", "mb-3");
    gananciaInput.placeholder = "Ganancia";

    segundoDiv.appendChild(precioInput);
    segundoDiv.appendChild(costoInput);
    segundoDiv.appendChild(gananciaInput);

    // Tercer Div
    const tercerDiv = document.createElement("div");
    tercerDiv.classList.add("d-flex");

    const sujetoAInput = document.createElement("input");
    sujetoAInput.type = "text";
    sujetoAInput.name = "sujetoA";
    sujetoAInput.classList.add("form-control", "mb-3");
    sujetoAInput.placeholder = "Sujeto A";

    const sujetoBInput = document.createElement("input");
    sujetoBInput.type = "text";
    sujetoBInput.name = "sujetoB";
    sujetoBInput.classList.add("form-control", "mb-3");
    sujetoBInput.placeholder = "Sujeto B";

    const sujetoCInput = document.createElement("input");
    sujetoCInput.type = "text";
    sujetoCInput.name = "sujetoC";
    sujetoCInput.classList.add("form-control", "mb-3");
    sujetoCInput.placeholder = "Sujeto C";

    tercerDiv.appendChild(sujetoAInput);
    tercerDiv.appendChild(sujetoBInput);
    tercerDiv.appendChild(sujetoCInput);

    // Agregar los inputs al DIV
    inputsDiv.appendChild(primerDiv);
    inputsDiv.appendChild(segundoDiv);
    inputsDiv.appendChild(tercerDiv);

    // Div principal
    productosDiv.appendChild(inputsDiv);
});
