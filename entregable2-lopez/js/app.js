// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    `;
    contenedor.appendChild(card);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));

  Swal.fire({
    title: "Agregado!",
    text: `${producto.nombre} se añadió al carrito.`,
    icon: "success",
    confirmButtonText: "OK"
  });
}

// Ver carrito
function verCarrito() {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "Agregá productos para verlos acá.", "info");
    return;
  }

  let total = carrito.reduce((acc, p) => acc + p.precio, 0);
  let lista = carrito.map(p => `• ${p.nombre} - $${p.precio}`).join('\n');

  Swal.fire({
    title: "Tu carrito",
    text: `${lista}\n\nTotal: $${total}`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Finalizar compra",
    cancelButtonText: "Seguir comprando"
  }).then(res => {
    if (res.isConfirmed) {
      finalizarCompra();
    }
  });
}

// Finalizar compra y vaciar carrito
function finalizarCompra() {
  carrito = [];
  localStorage.removeItem('carrito');
  Swal.fire("Compra realizada", "¡Gracias por tu compra!", "success");
}

// ver carrito
document.getElementById("verCarrito").addEventListener("click", verCarrito);

mostrarProductos();
