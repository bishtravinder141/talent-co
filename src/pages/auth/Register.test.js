import React from "react";
import { render, screen  } from "./../../../test-utils";
import Register from "./Register";
import userEvent from "@testing-library/user-event";

describe.skip("Signup Page Test", () => {

  beforeEach(() => {
    render(<Register />);
  })

  test("Signup Page Render Correctly", () => {
    expect(findPhoneInput()).toBeInTheDocument();
    expect(findPasswordInput()).toBeInTheDocument();
    expect(findConfirmPasswordInput()).toBeInTheDocument();
    expect(findSignUpBtn()).toBeInTheDocument();
    expect(findLoginApple()).toBeInTheDocument();
    expect(findLoginGoolge()).toBeInTheDocument();
    expect(findLoginMicrosoft()).toBeInTheDocument();
  });

  test("Register fileds works correctly", async () => {
    await userEvent.type(findPhoneInput(), "9675891201");
    await userEvent.type(findPasswordInput(), "Aviox@1234");
    await userEvent.type(findConfirmPasswordInput(), "Aviox@1234");
    expect(findPhoneInput().value).toEqual("9675891201");
    expect(findPasswordInput().value).toEqual("Aviox@1234");
    expect(findConfirmPasswordInput().value).toEqual("Aviox@1234");
  });

  test("Check 3 required - error Handling", async () => {
    await userEvent.click(findSignUpBtn());
    expect(findPhoneInput()).toHaveAccessibleErrorMessage(
      /mobile number must contain only digits/i
    );
    expect(findPasswordInput()).toHaveAccessibleErrorMessage(
      /Password is required/i
    );
    expect(findConfirmPasswordInput()).toHaveAccessibleErrorMessage(
      /confirm password is required/i
    );

    // Check after enter wrong input values
    await userEvent.type(findPhoneInput(), "9675891");
    expect(findPhoneInput()).toHaveAccessibleErrorMessage(
      "Mobile number must be at least 10 digits long"
    );
    await userEvent.type(findPasswordInput(), "Avio12");
    expect(findPasswordInput()).toHaveAccessibleErrorMessage(
      "Password must be at least 10 digits long."
    );
    await userEvent.type(findConfirmPasswordInput(), "Avio");
    expect(findConfirmPasswordInput()).toHaveAccessibleErrorMessage(
      "Passwords and confirm password must match"
    );
  });

  test('if switch to login page works', async () => {
    const Btn = screen.getByRole('link', {
      name: /log in/i
    })
    await userEvent.click(Btn);
    expect(window.location.pathname).toEqual('/login');
  });

  test("test if user already exist", async () => {
    await userEvent.type(findPhoneInput(), "9675891205");
    await userEvent.type(findPasswordInput(), "Aviox@1234");
    await userEvent.type(findConfirmPasswordInput(), "Aviox@1234");
    await userEvent.click(findSignUpBtn());
    expect(findServerResponceError()).toBeInTheDocument();
  });
});

function findPhoneInput() {
  return screen.getByRole("textbox");
}

function findPasswordInput() {
  return screen.getByPlaceholderText("Password");
}

function findConfirmPasswordInput() {
  return screen.getByPlaceholderText(/confirmpassword/i);
}

function findSignUpBtn() {
  return screen.getByRole("button", {
    name: /sign up/i,
  });
}

function findLoginApple() {
  return screen.getByRole("link", {
    name: /login with apple/i,
  });
}

function findLoginGoolge() {
  return screen.getByRole("button", {
    name: /login with google/i,
  });
}

function findLoginMicrosoft() {
  return screen.getByRole("button", {
    name: /login with microsoft/i,
  });
}

function findServerResponceError() {
  return screen.getByText(/user with this phone number already exists\./i);
}
