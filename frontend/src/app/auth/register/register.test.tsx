import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Register from "./page";
import userEvent from "@testing-library/user-event";
import User from "@/utils/declarations";
import UserAPI from "@/api/userAPI";

jest.mock("../../../api/userAPI");

const mockForm = {
  name: "John Doe",
  username: "johndoe",
  password: "password",
  email: "john.doe@gmail.com",
};
const emptyMockForm = {
  name: "",
  username: "",
  password: "",
  email: "",
};

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
      console.log("Submitting.....");
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
        screen.getByRole("textbox", { name: "Username" }),
      ).toBeInTheDocument();
    });

    it("Should display the password field", () => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("Should display the email field", () => {
      expect(
        screen.getByRole("textbox", { name: "Email" }),
      ).toBeInTheDocument();
    });

    it("Should display the register button", () => {
      expect(
        screen.getByRole("button", { name: "Register" }),
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

    it("should not call create user api", async () => {
      await fillAndSubmitForm({ ...emptyMockForm }, true);
      expect(UserAPI.create).toHaveBeenCalledTimes(0);
    });
  });

  describe("When creating an user", () => {
    describe("With a valid user", () => {
      const setupValidUser = async () => {
        (UserAPI.create as jest.Mock).mockResolvedValue({
          headers: {
            location: "user/userId",
          },
        });

        await fillAndSubmitForm(mockForm);
      };

      it("should call create user once", async () => {
        await setupValidUser();
        expect(UserAPI.create).toHaveBeenCalledTimes(1);
      });

      it("should disable the register button", async () => {
        console.log("disable register button");
        const button = screen.getByRole("button", { name: "Register" });
        expect(button).toBeEnabled();
        const setupPromise = setupValidUser();
        await waitFor(() => {
          expect(button).toBeDisabled();
        });
        await setupPromise;
      });
    });

    describe("When API returns error", () => {
      const setupApiError = async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        (UserAPI.create as jest.Mock).mockRejectedValue(new Error("Error"));
        await fillAndSubmitForm(mockForm);
      };

      it("should call create user once", async () => {
        await setupApiError();
        expect(UserAPI.create).toHaveBeenCalledTimes(1);
      });

      it("should display error message", async () => {
        await setupApiError();
        expect(screen.getByText("Unable to Register")).toBeInTheDocument();
      });
    });
  });
});
