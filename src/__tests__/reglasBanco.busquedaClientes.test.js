import { filtrarClientesPorBusqueda } from "../logica/reglasBanco";

test("filtra clientes por nombre, correo o ID", () => {
  const clientes = [
    { id: "CLI-001", name: "Ana Pérez", email: "ana@banco.com" },
    { id: "CLI-002", name: "Luis Rojas", email: "luis@banco.com" },
    { id: "VIP-003", name: "María Flores", email: "maria@banco.com" },
  ];

  const resultado = filtrarClientesPorBusqueda(clientes, "vip");

  expect(resultado).toHaveLength(1);
  expect(resultado[0].name).toBe("María Flores");
});
