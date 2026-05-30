import { obtenerPagosPendientesOrdenados } from "../logica/reglasBanco";

test("devuelve solo pagos pendientes ordenados por fecha de vencimiento", () => {
  const pagos = [
    { id: "p1", amount: 300, due_date: "2026-07-10", status: "paid" },
    { id: "p2", amount: 150, due_date: "2026-06-05", status: "pending" },
    { id: "p3", amount: 250, due_date: "2026-05-20", status: "pending" },
  ];

  const resultado = obtenerPagosPendientesOrdenados(pagos);

  expect(resultado.map((pago) => pago.id)).toEqual(["p3", "p2"]);
});
