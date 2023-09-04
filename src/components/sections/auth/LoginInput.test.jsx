/**
 * testing scenario
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import LoginInput from "./LoginInput";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("LoginInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} onCancel={() => {}} />);
    const emailInput = await screen.getByLabelText("Email");

    // Action
    await userEvent.type(emailInput, "email@test.com");

    // Assert
    expect(emailInput).toHaveValue("email@test.com");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} onCancel={() => {}} />);
    const passwordInput = await screen.getByLabelText("Password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should call login function when login button is clicked", async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput onLogin={mockLogin} onCancel={() => {}} />);
    const emailInput = await screen.getByLabelText("Email");
    await userEvent.type(emailInput, "email@test.com");
    const passwordInput = await screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "passwordtest");
    const loginButton = await screen.getByRole("button", { name: "Login" })

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'email@test.com',
      password: 'passwordtest',
    });
  });
});
