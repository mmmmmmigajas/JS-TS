// ── DEFINICIÓN DE TIPOS ───────────────────────────────────────

type TipoHabitacion = "Individual" | "Doble" | "Suite";

interface Habitacion {
  id: number;
  tipo: TipoHabitacion;
  camas: number;
  precioPorNoche: number;
  disponible: boolean;
}

interface Cliente {
  nombre: string;
  documento: string;
}

interface Reserva {
  numeroReserva: string;
  cliente: Cliente;
  habitacion: Habitacion;
  noches: number;
  total: number;
  fechaRegistro: string;
}

// ── DATOS INICIALES ──────────────────────────────────────────

const habitaciones: Habitacion[] = [
  { id: 101, tipo: "Individual", camas: 1, precioPorNoche: 80000,  disponible: true },
  { id: 102, tipo: "Individual", camas: 1, precioPorNoche: 80000,  disponible: true },
  { id: 201, tipo: "Doble",      camas: 2, precioPorNoche: 130000, disponible: true },
  { id: 202, tipo: "Doble",      camas: 2, precioPorNoche: 130000, disponible: false },
  { id: 301, tipo: "Suite",      camas: 3, precioPorNoche: 250000, disponible: true },
  { id: 302, tipo: "Suite",      camas: 3, precioPorNoche: 250000, disponible: true },
];

let reservas: Reserva[] = [];
let contadorReservas: number = 1000;

// ── UTILIDADES ───────────────────────────────────────────────

const formatoMoneda = (valor: number): string => 
  `$${valor.toLocaleString("es-CO")}`;

// ── FUNCIONES PRINCIPALES ─────────────────────────────────────

const verDisponibles = (): void => {
  console.log("\n--- Habitaciones Libres ---");
  const disponibles = habitaciones.filter(h => h.disponible);
  
  if (disponibles.length === 0) {
    console.log("No hay habitaciones disponibles.");
  } else {
    disponibles.forEach(h => {
      console.log(`[${h.id}] ${h.tipo} - ${h.camas} cama(s) - ${formatoMoneda(h.precioPorNoche)}/noche`);
    });
  }
};

const crearReserva = (cliente: Cliente, idHabitacion: number, noches: number): void => {
  const hab = habitaciones.find(h => h.id === idHabitacion);

  if (!hab) {
    return console.log("❌ Error: La habitación no existe.");
  }

  if (!hab.disponible) {
    return console.log(`❌ Error: La habitación ${idHabitacion} ya está ocupada.`);
  }

  // Realizar reserva
  hab.disponible = false;
  contadorReservas++;

  const nuevaReserva: Reserva = {
    numeroReserva: `RES-${contadorReservas}`,
    cliente: cliente,
    habitacion: hab,
    noches: noches,
    total: hab.precioPorNoche * noches,
    fechaRegistro: new Date().toLocaleDateString("es-CO")
  };

  reservas.push(nuevaReserva);
  console.log(`✅ Reserva creada: ${nuevaReserva.numeroReserva} para ${cliente.nombre}. Total: ${formatoMoneda(nuevaReserva.total)}`);
};

const resumenIngresos = (): void => {
  const total = reservas.reduce((acc, r) => acc + r.total, 0);
  console.log(`\n💰 Ingresos totales proyectados: ${formatoMoneda(total)}`);
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────

crearReserva({ nombre: "Ana Torres", documento: "111111" }, 101, 2);
crearReserva({ nombre: "Luis Gómez", documento: "222222" }, 301, 4);
verDisponibles();
resumenIngresos();