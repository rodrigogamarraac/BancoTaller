import { render, screen, waitFor } from "@testing-library/react";
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
            data: [
              {
                id: "c1",
                name: "Ana Pérez",
                email: "ana@mail.com",
              },
              {
                id: "c2",
                name: "Luis Rojas",
                email: "luis@mail.com",
              },
            ],
            error: null,
          }),
        })),
      };
    }

    return {};
  });
});

test("filtra clientes por nombre", async () => {
  const user = userEvent.setup();

  render(<SupervisorPage />);

  expect(await screen.findByText("Ana Pérez")).toBeInTheDocument();
  expect(screen.getByText("Luis Rojas")).toBeInTheDocument();

  await user.type(screen.getByPlaceholderText("Ej: Ana"), "Ana");

  await waitFor(() => {
    expect(screen.getByText("Ana Pérez")).toBeInTheDocument();
    expect(screen.queryByText("Luis Rojas")).not.toBeInTheDocument();
  });
});