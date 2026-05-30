import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SupervisorPage from "../pages/SupervisorPage";

const mockFrom = jest.fn();
const mockEqHistorial = jest.fn();

jest.mock("../supabaseClient", () => ({
  __esModule: true,
  default: {
    from: (...args) => mockFrom(...args),
  },
}));

beforeEach(() => {
  mockFrom.mockReset();
  mockEqHistorial.mockReset();

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

    if (table === "credit_histories") {
      const chain = {
        eq: mockEqHistorial.mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({
          data: {
            credit_score: 720,
          },
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

test("consulta y muestra el puntaje crediticio de un cliente", async () => {
  const user = userEvent.setup();

  render(<SupervisorPage />);

  await user.type(screen.getByPlaceholderText("Pega aquí el ID"), "c1");
  await user.click(screen.getByRole("button", { name: "Ver historial" }));

  expect(await screen.findByText("Puntaje crediticio:")).toBeInTheDocument();
  expect(screen.getByText("720")).toBeInTheDocument();

  expect(mockEqHistorial).toHaveBeenCalledWith("client_id", "c1");
});