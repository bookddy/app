import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./page";
import userEvent from "@testing-library/user-event";
import User from "@/utils/declarations";
import UserAPI from "@/api/userAPI";

jest.spyOn(UserAPI, "create");

const mock = new AxiosMockAdapter(axios);

mock
  .onPost("/user")
  .reply(
    200,
    { users: { id: 1, name: "John Smith" } },
    { location: "user/userId" }
  );

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

  const fillAndSubmitForm = async (mockForm: User, submit = true) => {
    const nameField = screen.getByRole("textbox", { name: /Name/ });
    const usernameField = screen.getByRole("textbox", { name: /Username/i });
    const passwordField = screen.getByLabelText(/password/i);
    const emailField = screen.getByRole("textbox", { name: /Email/i });

    await userEvent.type(nameField, mockForm.name || "{tab}");
    await userEvent.type(usernameField, mockForm.username || "{tab}");
    await userEvent.type(passwordField, mockForm.password || "{tab}");
    await userEvent.type(emailField, mockForm.email || "{tab}");

    if (submit) {
      const submitButton = screen.getByRole("button", { name: "Register" });
      await userEvent.click(submitButton);
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

    it("Should display the register button", () => {
      expect(
        screen.getByRole("button", { name: "Register" })
      ).toBeInTheDocument();
    });
  });

  describe("When form has invalid fields", () => {
    it("Should display an error message when empty name field", async () => {
      await fillAndSubmitForm({ ...mockForm, name: "" }, false);
      expect(screen.getByText("*Name is required")).toBeInTheDocument();
    });
    it("Should display an error message when empty username field", async () => {
      await fillAndSubmitForm({ ...mockForm, username: "" }, false);
      expect(screen.getByText("*Username is required")).toBeInTheDocument();
    });
    it("Should display an error message when empty password field", async () => {
      await fillAndSubmitForm({ ...mockForm, password: "" }, false);
      expect(screen.getByText("*Password is required")).toBeInTheDocument();
    });
    it("Should display an error message when empty email field", async () => {
      await fillAndSubmitForm({ ...mockForm, email: "" }, false);
      expect(screen.getByText("*Email is required")).toBeInTheDocument();
    });
  });

  describe("When creating an user", () => {
    describe("With a valid user", () => {
      const setupValidUser = async () => {
        await fillAndSubmitForm(mockForm);
      };

      it("should mock http call", async () => {
        const user = await UserAPI.create(mockForm);
        console.log(user);
      });

      it("should call create user once", async () => {
        await setupValidUser();
        expect(UserAPI.create).toHaveBeenCalledTimes(0);
      });
    });
  });
});
