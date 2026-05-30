export const PUNTAJE_MINIMO_CREDITO = 650;
export const PORCENTAJE_MAXIMO_CUOTA = 0.4;

export function validarIdUsuario(userId) {
  const idLimpio = String(userId ?? "").trim();

  if (!idLimpio) {
    return {
      valido: false,
      id: "",
      mensaje: "Ingresa un ID de usuario.",
    };
  }

  return {
    valido: true,
    id: idLimpio,
    mensaje: "",
  };
}

export function filtrarClientesPorBusqueda(clientes = [], busqueda = "") {
  const q = String(busqueda ?? "").trim().toLowerCase();

  if (!q) {
    return clientes;
  }

  return clientes.filter((cliente) => {
    const nombre = String(cliente.name ?? "").toLowerCase();
    const id = String(cliente.id ?? "").toLowerCase();
    const email = String(cliente.email ?? "").toLowerCase();

    return nombre.includes(q) || id.includes(q) || email.includes(q);
  });
}

export function obtenerPagosPendientesOrdenados(pagos = []) {
  return pagos
    .filter((pago) => pago.status === "pending")
    .slice()
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
}

export function calcularCuotaMensual(monto, plazoMeses) {
  const montoNumerico = Number(monto);
  const plazoNumerico = Number(plazoMeses);

  if (montoNumerico <= 0 || plazoNumerico <= 0) {
    return 0;
  }

  return montoNumerico / plazoNumerico;
}

export function evaluarSolicitudCredito({
  monto,
  plazoMeses,
  ingresoMensual,
  puntajeCrediticio,
}) {
  const montoNumerico = Number(monto);
  const plazoNumerico = Number(plazoMeses);
  const ingresoNumerico = Number(ingresoMensual);
  const puntajeNumerico = Number(puntajeCrediticio);

  if (
    montoNumerico <= 0 ||
    plazoNumerico <= 0 ||
    ingresoNumerico <= 0 ||
    Number.isNaN(puntajeNumerico)
  ) {
    return {
      aprobado: false,
      cuotaMensual: 0,
      motivo: "Todos los datos de la solicitud deben ser válidos y mayores a cero.",
    };
  }

  const cuotaMensual = calcularCuotaMensual(montoNumerico, plazoNumerico);
  const cuotaMaximaPermitida = ingresoNumerico * PORCENTAJE_MAXIMO_CUOTA;

  if (puntajeNumerico < PUNTAJE_MINIMO_CREDITO) {
    return {
      aprobado: false,
      cuotaMensual,
      motivo: "Puntaje crediticio insuficiente para aprobar el crédito.",
    };
  }

  if (cuotaMensual > cuotaMaximaPermitida) {
    return {
      aprobado: false,
      cuotaMensual,
      motivo: "La cuota mensual supera la capacidad de pago del cliente.",
    };
  }

  return {
    aprobado: true,
    cuotaMensual,
    motivo: "Crédito aprobado según las reglas de negocio.",
  };
}
