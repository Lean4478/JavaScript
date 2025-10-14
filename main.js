let productos = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("listaProductos");
const totalElemento = document.getElementById("total");

function agregarProducto() {
  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);

  if (nombre === "" || isNaN(precio) || precio <= 0) {
    alert("Tenes que ingresar un nombre y un precio válido.");
    return;
  }

  const producto = { nombre, precio };
  productos.push(producto);

  guardarEnLocalStorage();
  mostrarProductos();

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
}

function calcularTotal() {
  let total = 0;
  for (let i = 0; i < productos.length; i++) {
    total += productos[i].precio;
  }
  return total;
}

function mostrarProductos() {
  listaProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.onclick = () => eliminarProducto(index);
    li.appendChild(btnEliminar);

    listaProductos.appendChild(li);
  });

  const total = calcularTotal();
  totalElemento.textContent = `Total: $${total}`;
}

function guardarEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(productos));
}

function eliminarProducto(indice) {
  productos.splice(indice, 1);
  guardarEnLocalStorage();
  mostrarProductos();
}

function vaciarCarrito() {
  const confirmar = confirm("¿Seguro que queres vaciar el carrito?");
  if (confirmar) {
    productos = [];
    localStorage.removeItem("carrito");
    mostrarProductos();
  }
}

document.getElementById("Agregar").addEventListener("click", agregarProducto);
document.getElementById("Vaciar").addEventListener("click", vaciarCarrito);

mostrarProductos();