test("aprueba el crédito cuando el puntaje es suficiente", () => {
  const resultado = evaluarSolicitudCredito({
    monto: 12000,
    plazoMeses: 12,
    ingresoMensual: 4000,
    puntajeCrediticio: 720,
  });

  expect(resultado.aprobado).toBe(true);
  expect(resultado.motivo).toBe("Crédito aprobado según las reglas de negocio.");
});