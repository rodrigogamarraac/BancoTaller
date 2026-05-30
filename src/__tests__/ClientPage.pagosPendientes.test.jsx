import { render, screen } from "@testing-library/react";
import ClientPage from "../pages/ClientPage";

const mockFrom = jest.fn();
const mockEqPagos = jest.fn();

jest.mock("../supabaseClient", () => ({
  __esModule: true,
  default: {
    from: (...args) => mockFrom(...args),
  },
}));

beforeEach(() => {
  mockFrom.mockReset();
  mockEqPagos.mockReset();

  mockFrom.mockImplementation((table) => {
    if (table === "clients") {
      return {
        select: jest.fn(() => ({
          order: jest.fn().mockResolvedValue({
            data: [
              {
                id: "cliente-1",
                name: "María López",
                email: "maria@mail.com",
              },
            ],
            error: null,
          }),
        })),
      };
    }

    if (table === "payments") {
      const chain = {
        eq: mockEqPagos.mockReturnThis(),
        order: jest.fn().mockResolvedValue({
          data: [
            {
              id: "pago-1",
              amount: 150.5,
              due_date: "2026-06-10",
              description: "Cuota de préstamo",
              status: "pending",
            },
          ],
          error: null,
        }),
      };

      return {
        select: jest.fn(() => chain),
      };
    }

    return {};
  });
});

test("carga el primer cliente y muestra sus pagos pendientes", async () => {
  render(<ClientPage />);

  expect(await screen.findByText("Bs. 150.50")).toBeInTheDocument();
  expect(screen.getByText("Vence: 2026-06-10 — Cuota de préstamo")).toBeInTheDocument();

  expect(mockEqPagos).toHaveBeenCalledWith("client_id", "cliente-1");
  expect(mockEqPagos).toHaveBeenCalledWith("status", "pending");
});