import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./page";
import userEvent from "@testing-library/user-event";

const setupPageLoad = () => {
  return render(<Register />);
};

describe("<Register />", () => {
  beforeEach(() => {
    setupPageLoad();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockForm = {
    name: "John Doe",
    username: "johndoe",
    password: "password",
    email: "john.doe@gmail.com",
  };

  const fillAndSubmitForm = async (mockForm, submit = true) => {
    const nameField = screen.getByRole("textbox", { name: /Name/ });
    const usernameField = screen.getByRole("textbox", { name: /Username/i });
    const passwordField = screen.getByLabelText(/password/i);
    const emailField = screen.getByRole("textbox", { name: /Email/i });

    await userEvent.type(nameField, mockForm.name || "{tab}");
    await userEvent.type(usernameField, mockForm.username);
    await userEvent.type(passwordField, mockForm.password);
    await userEvent.type(emailField, mockForm.email);

    if (submit) {
      const submitButton = screen.getByRole("button", { name: "Submit" });
      userEvent.click(submitButton);
    }
  };

  describe("When register form loads", () => {
    it("Should have the title Register", () => {
      expect(screen.getByRole("heading")).toHaveTextContent("Register");
    });

    it("Should display the name field", () => {
      expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    });

    it("Should display the username field", () => {
      expect(
        screen.getByRole("textbox", { name: "Username" })
      ).toBeInTheDocument();
    });

    it("Should display the password field", () => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("Should display the email field", () => {
      expect(
        screen.getByRole("textbox", { name: "Email" })
      ).toBeInTheDocument();
    });

    it.skip("Should display the submit button", () => {
      expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    it.skip("Should display a terms and conditions checkbox", () => {
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(
        screen.getByLabelText("I agree to the terms and conditions")
      ).toBeInTheDocument();
    });

    it.skip("Should display an error message placeholder for invalid inputs", () => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });

  describe("When form has invalid fields", () => {
    it.skip("Should display an error message when empty name field", () => {
      setupPageLoad();
      fillAndSubmitForm({ ...mockForm, name: "" }, false);
      expect(screen.getByText("*Name is required")).toBeInTheDocument();
    });
  });
});
