// ── DEFINICIÓN DE TIPOS ───────────────────────────────────────
interface Cuenta {
  numero: string;
  titular: string;
  pin: string;
  saldo: number;
}

interface Transaccion {
  cuenta: string;
  tipo: 'Retiro' | 'Consignación' | 'Transferencia';
  monto: number;
  fecha: string;
}

// ── CUENTAS BANCARIAS ──────────────────────────────────────────
const cuentas: Cuenta[] = [
  { numero: "001", titular: "Ana Torres", pin: "1234", saldo: 500000 },
  { numero: "002", titular: "Luis Gómez", pin: "5678", saldo: 1200000 },
  { numero: "003", titular: "María Ruiz", pin: "9999", saldo: 75000 },
];

let transacciones: Transaccion[] = [];
let sesionActiva: Cuenta | null = null; // Puede ser una Cuenta o estar vacío

// ── UTILIDADES TIPADAS ─────────────────────────────────────────
const formatearPrecio = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

const ahora = (): string => new Date().toLocaleString("es-CO");

// ── FUNCIONES PRINCIPALES ──────────────────────────────────────
const iniciarSesion = (numeroCuenta: string, pinIngresado: string): void => {
  const cuentaencontrada = cuentas.find(c => c.numero === numeroCuenta);

  if (cuentaencontrada && cuentaencontrada.pin === pinIngresado) {
    sesionActiva = cuentaencontrada;
    console.log(`✅ Bienvenida/o, ${sesionActiva.titular}`);
  } else {
    console.log("❌ Datos incorrectos.");
  }
};

const consultarSaldo = (): void => {
  if (!sesionActiva) return console.log("⚠️ Inicie sesión primero.");
  console.log(`Tu saldo actual es: ${formatearPrecio(sesionActiva.saldo)}`);
};

const retirar = (monto: number): void => {
  if (!sesionActiva) return;
  
  if (monto > sesionActiva.saldo) {
    console.log("❌ Fondos insuficientes.");
  } else {
    sesionActiva.saldo -= monto;
    transacciones.push({
      cuenta: sesionActiva.numero,
      tipo: 'Retiro',
      monto: monto,
      fecha: ahora()
    });
    console.log(`✅ Retiro exitoso. Nuevo saldo: ${formatearPrecio(sesionActiva.saldo)}`);
  }
};