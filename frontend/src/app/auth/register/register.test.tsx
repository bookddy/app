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
    const nameField = screen.getByRole("textbox", {name: /Name/});
    const usernameField = screen.getByRole("textbox", {name: /Username/i});
    const passwordField = screen.getByLabelText(/password/i);
    const emailField = screen.getByRole("textbox", {name: /Email/i});

    await userEvent.type(nameField, mockForm.name || "{tab}");
    await userEvent.type(usernameField, mockForm.username);
    await userEvent.type(passwordField, mockForm.password);
    await userEvent.type(emailField, mockForm.email);

    if (submit) {
      const submitButton = screen.getByRole("button", {name: "Submit"});
      userEvent.click(submitButton);
    }
  };

  describe("When register form loads", () => {
    it("Should have the title Register", () => {
      expect(screen.getByRole("heading")).toHaveTextContent("Register");
    });

    it("Should display the name field", () => {
      expect(screen.getByRole("textbox", {name: "Name"})).toBeInTheDocument();
    });

    it("Should display the username field", () => {
      expect(
        screen.getByRole("textbox", {name: "Username"})
      ).toBeInTheDocument();
    });

    it("Should display the password field", () => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("Should display the email field", () => {
      expect(
        screen.getByRole("textbox", {name: "Email"})
      ).toBeInTheDocument();
    });

    it("Should display the register button", () => {
      expect(
        screen.getByRole("button", {name: "Register"})
      ).toBeInTheDocument();
    });

  });

  describe("When form has invalid fields", () => {
    it("Should display an error message when empty name field", () => {
      fillAndSubmitForm({...mockForm, name: ""}, false);
      expect(screen.getByText("*Name is required")).toBeInTheDocument();
    });
    it("Should display an error message when empty username field", () => {
      fillAndSubmitForm({...mockForm, username: ""}, false);
      expect(screen.getByText("*Username is required")).toBeInTheDocument();
    });
    it("Should display an error message when empty password field", () => {
      fillAndSubmitForm({...mockForm, password: ""}, false);
      expect(screen.getByText("*Password is required")).toBeInTheDocument();
    });
    it("Should display an error message when empty email field", () => {
      fillAndSubmitForm({...mockForm, email: ""}, false);
      expect(screen.getByText("*Email is required")).toBeInTheDocument();
    });
  });

  // describe("When creating an user",()=>{
  //   describe('With a valid user', () => {
  //
  //   });
  // });
});
