import { ordenarClientesAlfabeticamente } from "../logica/reglasBanco";

test("ordena clientes alfabéticamente y conserva ID y email", () => {
  const clientes = [
    { id: "003", name: "Luis Rojas", email: "luis@banco.com" },
    { id: "001", name: "Ana Fernandz", email: "ana@banco.com" },
    { id: "002", name: "Maria Flores", email: "maria@banco.com" },
  ];

  const resultado = ordenarClientesAlfabeticamente(clientes);

  expect(resultado.map((cliente) => cliente.name)).toEqual([
    "Ana Fernandz",
    "Luis Rojas",
    "Maria Flores",
  ]);

  expect(resultado[0]).toMatchObject({
    id: "001",
    email: "ana@banco.com",
  });
});