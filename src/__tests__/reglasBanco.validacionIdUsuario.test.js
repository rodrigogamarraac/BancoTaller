import { validarIdUsuario } from "../logica/reglasBanco";

test("rechaza la consulta de historial cuando el ID de usuario está vacío", () => {
  const resultado = validarIdUsuario("   ");

  expect(resultado.valido).toBe(false);
  expect(resultado.id).toBe("");
  expect(resultado.mensaje).toBe("Ingresa un ID de usuario.");
});
