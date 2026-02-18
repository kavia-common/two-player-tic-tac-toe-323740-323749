import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the tic tac toe title and initial turn indicator", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /tic tac toe/i })).toBeInTheDocument();
  expect(screen.getByText(/turn:\s*x/i)).toBeInTheDocument();
});
