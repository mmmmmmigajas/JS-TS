// ── DEFINICIÓN DE TIPOS ───────────────────────────────────────

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

// ── CATÁLOGO DE PRODUCTOS ─────────────────────────────────────

const catalogo: Producto[] = [
  { id: 1, nombre: "Camiseta", precio: 35000, stock: 10 },
  { id: 2, nombre: "Pantalón", precio: 80000, stock: 5 },
  { id: 3, nombre: "Zapatos",  precio: 120000, stock: 3 },
  { id: 4, nombre: "Gorra",    precio: 25000, stock: 8 },
  { id: 5, nombre: "Medias",   precio: 8000,  stock: 20 },
];

let carrito: ItemCarrito[] = [];

// ── UTILIDADES ───────────────────────────────────────────────

const formatearPrecio = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

const buscarEnCatalogo = (id: number): Producto | undefined =>
  catalogo.find(p => p.id === id);

// ── FUNCIONES PRINCIPALES ─────────────────────────────────────

const agregarProducto = (id: number, cantidad: number): void => {
  const producto = buscarEnCatalogo(id);

  if (!producto) {
    return console.log("❌ Producto no encontrado.");
  }

  if (producto.stock < cantidad) {
    return console.log(`⚠️ Stock insuficiente. Solo quedan ${producto.stock} unidades.`);
  }

  // Verificar si ya está en el carrito
  const itemExistente = carrito.find(item => item.producto.id === id);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ producto, cantidad });
  }

  // Restar del stock global
  producto.stock -= cantidad;
  console.log(`✅ Agregado: ${cantidad} x ${producto.nombre}`);
};

const calcularTotal = (): number => {
  // Usamos reduce para sumar el precio * cantidad de cada item
  return carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
};

const mostrarResumen = (): void => {
  console.log("\n--- Tu Carrito ---");
  if (carrito.length === 0) {
    console.log("El carrito está vacío.");
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.producto.precio * item.cantidad;
    console.log(`- ${item.producto.nombre} x${item.cantidad}: ${formatearPrecio(subtotal)}`);
  });

  const total = calcularTotal();
  console.log(`TOTAL A PAGAR: ${formatearPrecio(total)}`);
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
agregarProducto(1, 2); // 2 Camisetas
agregarProducto(3, 1); // 1 par de Zapatos
mostrarResumen();