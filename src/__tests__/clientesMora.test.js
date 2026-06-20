import { obtenerClientesConMora } from "../logica/reglasBanco";

test("muestra únicamente clientes con al menos una cuota vencida", () => {
  const clientes = [
    { id: "001", name: "Ana Fernandez" },
    { id: "002", name: "Luis Rojas" },
    { id: "003", name: "Maria Flores" },
  ];

  const cuotas = [
    {
      clienteId: "001",
      amount: 100,
      due_date: "2026-06-01",
      status: "pending",
    },
    {
      clienteId: "001",
      amount: 50,
      due_date: "2026-06-10",
      status: "pending",
    },
    {
      clienteId: "002",
      amount: 300,
      due_date: "2026-06-25",
      status: "pending",
    },
    {
      clienteId: "003",
      amount: 200,
      due_date: "2026-05-01",
      status: "paid",
    },
  ];

  const resultado = obtenerClientesConMora(clientes, cuotas, "2026-06-19");

  expect(resultado).toHaveLength(1);
  expect(resultado[0]).toMatchObject({
    id: "001",
    name: "Ana Fernandez",
    diasAtraso: 18,
    montoVencido: 150,
    cuotasVencidas: 2,
  });
});