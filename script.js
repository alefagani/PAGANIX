// ==== VARIABLES Y CONSTANTES ====
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==== CARGAR PRODUCTOS DESDE JSON ====
async function cargarProductos() {
  try {
    const respuesta = await fetch("data/productos.json");
    const productos = await respuesta.json();

    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// ==== MOSTRAR PRODUCTOS EN HTML ====
function mostrarProductos(productos) {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// ==== AGREGAR PRODUCTO AL CARRITO ====
async function agregarAlCarrito(id) {
  const respuesta = await fetch("data/productos.json");
  const productos = await respuesta.json();

  const producto = productos.find((p) => p.id === id);

  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}

// ==== MOSTRAR CARRITO ====
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <span>${item.nombre} (${item.cantidad})</span>
      <span>$${item.precio * item.cantidad}</span>
    `;
    contenedorCarrito.appendChild(div);
  });

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("item-carrito");
  totalDiv.innerHTML = `<strong>Total:</strong> <strong>$${total}</strong>`;
  contenedorCarrito.appendChild(totalDiv);

  // ==== BOTÓN FINALIZAR COMPRA ====
  const finalizarBtn = document.createElement("button");
  finalizarBtn.textContent = "Finalizar compra";
  finalizarBtn.classList.add("btn-finalizar");
  finalizarBtn.onclick = finalizarCompra;
  contenedorCarrito.appendChild(finalizarBtn);
}

// ==== GUARDAR EN LOCALSTORAGE ====
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==== VACIAR CARRITO ====
function vaciarCarrito() {
  if (confirm("¿Seguro que querés vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
  }
}

// ==== INICIALIZAR ====
cargarProductos();
mostrarCarrito();
function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarMensaje("Tu carrito está vacío.", false);
    return;
  }

  const confirmar = confirm("¿Deseás finalizar la compra?");
  if (confirmar) {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    mostrarMensaje(
      "✅ ¡Compra realizada con éxito! Gracias por elegir PAGANIX 🖤",
      true
    );
  }
  function mostrarMensaje(texto, exito = true) {
    const mensajeDiv = document.getElementById("mensaje-compra");
    mensajeDiv.textContent = texto;

    // Estilo según el tipo de mensaje
    mensajeDiv.style.backgroundColor = exito
      ? "rgba(0, 200, 0, 0.9)"
      : "rgba(200, 0, 0, 0.9)";
    mensajeDiv.classList.add("visible");

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      mensajeDiv.classList.remove("visible");
    }, 3000);
  }
}
