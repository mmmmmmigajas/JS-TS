// ── DEFINICIÓN DE TIPOS ───────────────────────────────────────

// Usamos un Type Alias para limitar las opciones de tipo de turno
type TipoUsuario = "Normal" | "Preferencial";

interface Modulo {
  id: number;
  nombre: string;
  disponible: boolean;
  atiendeTipo: TipoUsuario[]; // Un array de los tipos que puede atender
}

interface Turno {
  codigo: string;
  cliente: string;
  tipo: TipoUsuario;
  horaLlegada: string;
  atendidoPor?: string; // El '?' significa que es opcional (al inicio no tiene módulo)
}

// ── CONFIGURACIÓN DEL SISTEMA ────────────────────────────────

const modulos: Modulo[] = [
  { id: 1, nombre: "Caja 1", disponible: true, atiendeTipo: ["Normal", "Preferencial"] },
  { id: 2, nombre: "Caja 2", disponible: true, atiendeTipo: ["Normal"] },
  { id: 3, nombre: "Información", disponible: false, atiendeTipo: ["Normal", "Preferencial"] },
];

let cola: Turno[] = [];
let historialAtendidos: Turno[] = [];

let contadorNormal: number = 0;
let contadorPreferencial: number = 0;

// ── UTILIDADES ───────────────────────────────────────────────

const horaActual = (): string => new Date().toLocaleTimeString("es-CO");

const generarCodigo = (tipo: TipoUsuario): string => {
  if (tipo === "Preferencial") {
    contadorPreferencial++;
    return `P-${contadorPreferencial.toString().padStart(3, "0")}`;
  } else {
    contadorNormal++;
    return `N-${contadorNormal.toString().padStart(3, "0")}`;
  }
};

// ── FUNCIONES PRINCIPALES ─────────────────────────────────────

const asignarTurno = (nombre: string, tipo: TipoUsuario): void => {
  const nuevoTurno: Turno = {
    codigo: generarCodigo(tipo),
    cliente: nombre,
    tipo: tipo,
    horaLlegada: horaActual(),
  };

  cola.push(nuevoTurno);
  console.log(`🎫 Turno asignado: ${nuevoTurno.codigo} para ${nuevoTurno.cliente}`);
};

const llamarSiguiente = (idModulo: number): void => {
  const modulo = modulos.find(m => m.id === idModulo);

  if (!modulo || !modulo.disponible) {
    return console.log("❌ El módulo no está disponible.");
  }

  // Lógica de prioridad: Buscar primero preferenciales si el módulo los atiende
  let indiceTurno = -1;

  if (modulo.atiendeTipo.includes("Preferencial")) {
    indiceTurno = cola.findIndex(t => t.tipo === "Preferencial");
  }

  // Si no hay preferenciales o el módulo solo atiende normales, tomar el primero de la fila
  if (indiceTurno === -1) {
    indiceTurno = cola.findIndex(t => modulo.atiendeTipo.includes(t.tipo));
  }

  if (indiceTurno !== -1) {
    const [turnoAtendido] = cola.splice(indiceTurno, 1);
    turnoAtendido.atendidoPor = modulo.nombre;
    historialAtendidos.push(turnoAtendido);
    
    console.log(`🔔 Llamando a ${turnoAtendido.codigo} (${turnoAtendido.cliente}) a la ${modulo.nombre}`);
  } else {
    console.log("📭 No hay turnos pendientes para este módulo.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
asignarTurno("Elena Vargas", "Normal");
asignarTurno("Abuela Rosa", "Preferencial"); // Tiene prioridad
llamarSiguiente(1); // Debería llamar a la Abuela Rosa primero