import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkerPage from "../pages/WorkerPage";

test("muestra una alerta al calcular el crédito", async () => {
  const user = userEvent.setup();

  window.alert = jest.fn();

  render(<WorkerPage />);

  await user.click(screen.getByRole("button", { name: "Calcular crédito" }));

  expect(window.alert).toHaveBeenCalledWith("Cálculo de crédito realizado");
});