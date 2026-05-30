import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

jest.mock("../pages/SupervisorPage", () => {
  const React = require("react");

  return {
    __esModule: true,
    default: () => React.createElement("div", null, "Panel supervisor mock"),
  };
});

jest.mock("../pages/WorkerPage", () => {
  const React = require("react");

  return {
    __esModule: true,
    default: () => React.createElement("div", null, "Panel trabajador mock"),
  };
});

jest.mock("../pages/ClientPage", () => {
  const React = require("react");

  return {
    __esModule: true,
    default: () => React.createElement("div", null, "Panel cliente mock"),
  };
});

test("cambia correctamente entre supervisor, trabajador y cliente", async () => {
  const user = userEvent.setup();

  render(<App />);

  expect(screen.getByText("Panel supervisor mock")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Trabajador" }));
  expect(screen.getByText("Panel trabajador mock")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Cliente" }));
  expect(screen.getByText("Panel cliente mock")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Supervisor" }));
  expect(screen.getByText("Panel supervisor mock")).toBeInTheDocument();
});