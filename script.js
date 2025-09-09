// ======== VARIABLES, CONSTANTES Y ARRAYS ========
const IVA = 0.21; // 21% de IVA
let carrito = [];
const productos = [
  { nombre: "Remera Clásica", precio: 8000 },
  { nombre: "Pantalón Deportivo", precio: 12000 },
  { nombre: "Buzo Artic", precio: 15000 },
  { nombre: "Sweater", precio: 13000 },
];

// ======== FUNCIONES PRINCIPALES ========

// Muestra los productos disponibles
function mostrarProductos() {
  console.clear();
  console.log("=== Productos Disponibles en PAGANIX ===");
  let lista = "Productos disponibles:\n";
  productos.forEach((p, i) => {
    console.log(`${i + 1}. ${p.nombre} - $${p.precio}`);
    lista += `${i + 1}. ${p.nombre} - $${p.precio}\n`;
  });
  alert(lista);
}

// Permite agregar productos al carrito mediante prompt y confirm
function agregarAlCarrito() {
  mostrarProductos();
  let opcion;
  do {
    opcion = parseInt(
      prompt("Ingrese el número del producto a agregar (0 para salir):")
    );
    if (opcion > 0 && opcion <= productos.length) {
      carrito.push(productos[opcion - 1]);
      alert(`${productos[opcion - 1].nombre} agregado al carrito.`);
      console.log("Carrito actual:", carrito);
    } else if (opcion !== 0 && !isNaN(opcion)) {
      alert("Opción inválida. Intente de nuevo.");
    }
    // Si ingresó NaN (por cancelar o texto), rompe
    if (isNaN(opcion)) break;
  } while (opcion !== 0 && confirm("¿Deseás agregar otro producto?"));
}

// Finaliza la compra: suma, aplica IVA y muestra resumen
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. No hay nada para finalizar.");
    return;
  }
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
  }
  const ivaMonto = total * IVA;
  const totalConIVA = total + ivaMonto;
  alert(
    `Resumen de tu compra:\n` +
      `-------------------------\n` +
      `Subtotal: $${total}\n` +
      `IVA (21%): $${ivaMonto.toFixed(2)}\n` +
      `TOTAL FINAL: $${totalConIVA.toFixed(2)}`
  );
  console.log("Compra finalizada. Total con IVA:", totalConIVA.toFixed(2));
}

// ======== EJECUCIÓN TRIGGERED POR BOTÓN ========
window.addEventListener("DOMContentLoaded", () => {
  // Crear un botón para “Simular compra”
  const btn = document.createElement("button");
  btn.textContent = "Simular compra";
  Object.assign(btn.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    padding: "10px 14px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    zIndex: "9999",
    fontSize: "14px",
  });
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    alert("Bienvenid@ a PAGANIX — simulá tu compra");
    agregarAlCarrito();
    if (carrito.length > 0 && confirm("¿Querés finalizar tu compra?")) {
      finalizarCompra();
    } else if (carrito.length > 0) {
      alert("Podés volver a simular compra cuando quieras.");
      console.log("Simulación incompleta, carrito actual:", carrito);
    }
  });
});
