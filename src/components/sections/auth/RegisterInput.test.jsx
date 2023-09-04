/**
 * testing scenario
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import RegisterInput from "./RegisterInput";

expect.extend(matchers);

describe('RegisterInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it("should handle name typing correctly", async () => {
        // Arrange
        render(<RegisterInput onRegister={() => {}} onCancel={() => {}} />);
        const emailInput = await screen.getByLabelText("Name");

        // Action
        await userEvent.type(emailInput, "nametest");

        // Assert
        expect(emailInput).toHaveValue("nametest");
    });

    it("should handle email typing correctly", async () => {
        // Arrange
        render(<RegisterInput onRegister={() => {}} onCancel={() => {}} />);
        const emailInput = await screen.getByLabelText("Email");

        // Action
        await userEvent.type(emailInput, "email@test.com");

        // Assert
        expect(emailInput).toHaveValue("email@test.com");
    });

    it("should handle password typing correctly", async () => {
        // Arrange
        render(<RegisterInput onRegister={() => {}} onCancel={() => {}} />);
        const passwordInput = await screen.getByLabelText("Password");

        // Action
        await userEvent.type(passwordInput, "passwordtest");

        // Assert
        expect(passwordInput).toHaveValue("passwordtest");
    });

    it("should call register function when register button is clicked", async () => {
        // Arrange
        const mockRegister = jest.fn();
        render(<RegisterInput onRegister={mockRegister} onCancel={() => {}} />);
        const nameInput = await screen.getByLabelText("Name");
        await userEvent.type(nameInput, "nametest");
        const emailInput = await screen.getByLabelText("Email");
        await userEvent.type(emailInput, "email@test.com");
        const passwordInput = await screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "passwordtest");
        const registerButton = await screen.getByRole("button", { name: "Register" })

        // Action
        await userEvent.click(registerButton);

        // Assert
        expect(mockRegister).toBeCalledWith({
            name: 'nametest',
            email: 'email@test.com',
            password: 'passwordtest',
        });
    });
});