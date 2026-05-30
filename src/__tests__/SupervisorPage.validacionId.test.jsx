import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SupervisorPage from "../pages/SupervisorPage";

const mockFrom = jest.fn();

jest.mock("../supabaseClient", () => ({
  __esModule: true,
  default: {
    from: (...args) => mockFrom(...args),
  },
}));

beforeEach(() => {
  mockFrom.mockReset();

  mockFrom.mockImplementation((table) => {
    if (table === "clients") {
      return {
        select: jest.fn(() => ({
          order: jest.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        })),
      };
    }

    return {};
  });
});

test("muestra mensaje de error si se intenta buscar historial sin ID", async () => {
  const user = userEvent.setup();

  render(<SupervisorPage />);

  await user.click(screen.getByRole("button", { name: "Ver historial" }));

  expect(screen.getByRole("alert")).toHaveTextContent("Ingresa un ID de usuario.");
});