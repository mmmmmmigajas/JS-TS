// ── DEFINICIÓN DE TIPOS ───────────────────────────────────────

interface Zona {
  id: number;
  nombre: string;
  precio: number;
  capacidad: number;
  vendidas: number;
}

interface Comprador {
  nombre: string;
  documento: string;
}

interface Venta {
  idVenta: string;
  comprador: Comprador;
  zona: string; // Guardamos el nombre de la zona
  cantidad: number;
  total: number;
  fecha: string;
}

// ── CONFIGURACIÓN INICIAL ────────────────────────────────────

const zonas: Zona[] = [
  { id: 1, nombre: "Norte (Popular)",     precio: 25000,  capacidad: 500, vendidas: 0 },
  { id: 2, nombre: "Sur (Popular)",       precio: 25000,  capacidad: 500, vendidas: 0 },
  { id: 3, nombre: "Occidental (Platea)", precio: 80000,  capacidad: 200, vendidas: 0 },
  { id: 4, nombre: "Oriental (Platea)",   precio: 80000,  capacidad: 200, vendidas: 0 },
  { id: 5, nombre: "Palco VIP",           precio: 180000, capacidad: 50,  vendidas: 0 },
];

let ventas: Venta[] = [];
let contadorVentas: number = 0;

// ── UTILIDADES ───────────────────────────────────────────────

const formatearDinero = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

// ── FUNCIONES PRINCIPALES ─────────────────────────────────────

const verDisponibilidad = (): void => {
  console.log("\n--- Estado de Localidades ---");
  zonas.forEach(z => {
    const disponibles = z.capacidad - z.vendidas;
    console.log(`${z.nombre}: ${disponibles} de ${z.capacidad} disponibles`);
  });
};

const comprarBoletas = (cliente: Comprador, idZona: number, cantidad: number): void => {
  const zona = zonas.find(z => z.id === idZona);

  // Validación de existencia
  if (!zona) {
    return console.log("❌ La zona seleccionada no existe.");
  }

  // Validación de capacidad
  const disponibles = zona.capacidad - zona.vendidas;
  if (cantidad > disponibles) {
    return console.log(`⚠️ No hay suficientes boletas. Solo quedan ${disponibles} en ${zona.nombre}.`);
  }

  // Procesar venta
  const valorTotal = zona.precio * cantidad;
  zona.vendidas += cantidad;
  contadorVentas++;

  const nuevaVenta: Venta = {
    idVenta: `BOL-${contadorVentas.toString().padStart(4, "0")}`,
    comprador: cliente,
    zona: zona.nombre,
    cantidad: cantidad,
    total: valorTotal,
    fecha: new Date().toLocaleString("es-CO")
  };

  ventas.push(nuevaVenta);
  console.log(`✅ ¡Venta Exitosa! ID: ${nuevaVenta.idVenta}. Total: ${formatearDinero(valorTotal)}`);
};

const recaudacionTotal = (): void => {
  const total = ventas.reduce((acc, v) => acc + v.total, 0);
  console.log(`\n💰 Recaudación total del evento: ${formatearDinero(total)}`);
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────

comprarBoletas({ nombre: "Carlos Pérez", documento: "123456" }, 1, 5); // 5 Norte
comprarBoletas({ nombre: "María Gómez", documento: "789012" }, 5, 2); // 2 Palcos
verDisponibilidad();
recaudacionTotal();