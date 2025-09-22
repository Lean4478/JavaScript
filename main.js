// Variables y arrays
const productos = []; 
let total = 0;

// datos al usuario
function agregarProducto() {
    let nombre = prompt("Ingrese el nombre del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto:"));

    if (isNaN(precio) || precio <= 0) {
        alert("El precio ingresado no es válido.");
        return;
    }

    productos.push({ nombre, precio });
    total += precio;

    alert(`Producto agregado: ${nombre} - $${precio}\nTotal actual: $${total}`);
}

//total
function calcularTotal() {
    console.log("Calculando total de la compra...");
    let suma = 0;

    for (let i = 0; i < productos.length; i++) {
        suma += productos[i].precio;
    }

    return suma;
}

//mostrar resumen 
function mostrarResumen() {
    if (productos.length === 0) {
        alert("No agregaste ningún producto.");
        return;
    }

    let lista = "";
    for (let i = 0; i < productos.length; i++) {
        lista += `- ${productos[i].nombre}: $${productos[i].precio}\n`;
    }

    let totalFinal = calcularTotal();
    alert(
        "Resumen de compra:\n\n" +
        lista +
        "\nTotal a pagar: $" + totalFinal
    );

    console.log("Resumen de compra:", productos, "Total:", totalFinal);
}


alert("Bienvenido al Simulador de Compras ");

let continuar = true;
while (continuar) {
    let opcion = prompt(
        "Elige una opción:\n1. Agregar producto\n2. Ver total\n3. Mostrar resumen y salir"
    );

    switch (opcion) {
        case "1":
            agregarProducto();
            break;
        case "2":
            let totalActual = calcularTotal();
            alert("El total acumulado hasta ahora es: $" + totalActual);
            break;
        case "3":
            mostrarResumen();
            continuar = false;
            break;
        default:
            alert("Opción no válida. Intenta de nuevo.");
    }

    if (continuar) {
        continuar = confirm("¿Deseas continuar?");
    }
}

alert("Gracias por usar el simulador");