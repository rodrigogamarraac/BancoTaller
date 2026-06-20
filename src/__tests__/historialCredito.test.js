import { buscarHistorialCreditoUsuario } from "../logica/reglasBanco";

test("muestra usuario no encontrado cuando el cliente no existe", () => {
  const usuarios = [
    { id: "001", name: "Ana Fernandez", puntajeCrediticio: 720 },
    { id: "002", name: "Luis Rojas", puntajeCrediticio: 610 },
  ];

  const resultado = buscarHistorialCreditoUsuario(usuarios, "999");

  expect(resultado.encontrado).toBe(false);
  expect(resultado.mensaje).toBe("Usuario no encontrado");
  expect(resultado.puntaje).toBeNull();
});