// ==== ARRAY DE PRODUCTOS ====
const productos = [
  { id: 1, nombre: "Sweater", precio: 12000, img: "img/sweater.jpg" },
  { id: 2, nombre: "Remera", precio: 8000, img: "img/remera.jpg" },
  { id: 3, nombre: "Pantalón", precio: 15000, img: "img/pantalon.jpg" },
  { id: 4, nombre: "Buzo", precio: 14000, img: "img/buzo.jpg" },
];

// ==== CARRITO ====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==== MOSTRAR PRODUCTOS EN HTML ====
const contenedorProductos = document.getElementById("productos");

function mostrarProductos() {
  contenedorProductos.innerHTML = `
    <h2>🛍️ Nuestros Productos</h2>
    <div class="grid-productos">
      ${productos
        .map(
          (prod) => `
        <div class="producto">
          <img src="${prod.img}" alt="${prod.nombre}">
          <h3>${prod.nombre}</h3>
          <p>Precio: $${prod.precio}</p>
          <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

mostrarProductos();

// ==== AGREGAR AL CARRITO ====
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
}

// ==== MOSTRAR CARRITO ====
const contenedorCarrito = document.getElementById("carrito");

function mostrarCarrito() {
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío 🛒</p>";
    return;
  }

  contenedorCarrito.innerHTML = `
    <div id="carrito-contenedor">
      ${carrito
        .map(
          (item, index) => `
        <div class="item-carrito">
          <p>${item.nombre} - $${item.precio}</p>
          <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
        </div>
      `
        )
        .join("")}
    </div>
    <p><strong>Total: $${calcularTotal()}</strong></p>
    <button onclick="vaciarCarrito()" class="btn-vaciar">Vaciar carrito</button>
  `;
}

mostrarCarrito();

// ==== ELIMINAR PRODUCTO DEL CARRITO ====
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

// ==== VACIAR CARRITO ====
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

// ==== CALCULAR TOTAL ====
function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio, 0);
}

// ==== GUARDAR EN LOCALSTORAGE ====
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
