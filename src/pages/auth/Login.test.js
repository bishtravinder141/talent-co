import React from "react";
import { render, screen, waitFor } from "./../../../test-utils";
import Login from "./login";
import userEvent from "@testing-library/user-event";

describe.skip("Login Page Test", () => {
  beforeEach(() => {
    render(<Login />);
  })
  test("loginPage Render Correctly", () => {
    expect(findPhoneInput()).toBeInTheDocument();
    expect(findPasswordInut()).toBeInTheDocument();
    expect(findLoginBtn()).toBeInTheDocument();
    expect(findForgetPassword()).toBeInTheDocument();
    expect(findSignUpBtn()).toBeInTheDocument();
    expect(findLoginApple()).toBeInTheDocument();
    expect(findLoginGoolge()).toBeInTheDocument();
    expect(findLoginMicrosoft()).toBeInTheDocument();
    expect(findFormElemet()).toBeInTheDocument();
  });

  test("if input filed works correctly", async () => {
    await userEvent.type(findPhoneInput(), "9675891201");
    expect(findPhoneInput().value).toEqual("9675891201");
    await userEvent.type(findPasswordInut(), "Aviox@1234");
    expect(findPasswordInut().value).toEqual("Aviox@1234");
  });

  test("Check 2 required - error Handling", async () => {
    await userEvent.click(findLoginBtn());
    expect(findPhoneInput()).toHaveAccessibleErrorMessage('Mobile number must contain only digits');
    expect(findPasswordInut()).toHaveAccessibleErrorMessage('Password is required');
    await userEvent.type(findPhoneInput(), "967589112");    
    expect(findPhoneInput()).toHaveAccessibleErrorMessage('Mobile number must be at least 10 digits long');
    await userEvent.type(findPasswordInut(), "Avio124");
    expect(findPasswordInut()).toHaveAccessibleErrorMessage('Password must be at least 10 digits long.');
  });

  test("Test if login successful", async () => {
    const handleOnSubmitMock = jest.fn();
    await userEvent.type(findPhoneInput(), "9675891201");
    await userEvent.type(findPasswordInut(), "Aviox@1234");
    findFormElemet().onsubmit = handleOnSubmitMock;
    await userEvent.click(findLoginBtn());
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
  });

  test("error expected if wrong email password enter", async () => {
    await userEvent.type(findPhoneInput(), "9675891205");
    await userEvent.type(findPasswordInut(), "Aviox@1231254");
    await userEvent.click(findLoginBtn());
    expect(findInvalidCredentials()).toBeInTheDocument();
  });

  test('is switch to register page works', async () => {
    const Btn = screen.getByRole('link', {
      name: /sign up/i
    })
    await userEvent.click(Btn);
    expect(window.location.pathname).toEqual('/register');
  });
});

// Common target element

function findPhoneInput() {
  return screen.getByRole("textbox");
}

function findPhoneInputError() {
  return screen.getByRole("textbox", {name: 'Has Error'});
}


function findPasswordInut() {
  return screen.getByPlaceholderText(/password/i);
}

function findLoginBtn() {
  return screen.getByRole("button", {
    name: "Login",
  });
}

function findForgetPassword() {
  return screen.getByRole("link", {
    name: /forgot password\?/i,
  });
}

function findSignUpBtn() {
  return screen.getByRole("link", { name: /Sign up/i });
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

function findFormElemet(){
  return screen.getByRole("form");
} 

function findInvalidCredentials(){
 return screen.getByText(/invalid credentials/i)
}



// toHaveErrorMessage

// const url = "https://talentco-api.mydevtest.in/api/v1/accounts/token/"

// const body = {
//   "phone_number": "+919675891801",
//   "password": "Aviox@1234"
// }

// const response  = {
//   "data": {
//       "id": "24",
//       "phone_number": "+919675891801",
//       "email": "",
//       "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NzIwMTYzLCJpYXQiOjE2OTc2MzM3NjMsImp0aSI6IjRiODBlYjU3NDIyZTQ3MDE5OWI4MDVmNTQ3ZjBkZjZiIiwidXNlcl9pZCI6MjR9.Ni8-mFp3IMM7RqGs5AbD-TyAowwf3njOjpqNckFzXJ4",
//       "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzcyMDE2MywiaWF0IjoxNjk3NjMzNzYzLCJqdGkiOiJhNWJiMTRkMmI0MjY0M2Q4YTczMDYzMWM5MTFlMTA5MSIsInVzZXJfaWQiOjI0fQ.e9mKkMe1-eO0Cm_Udoe4jVLvaSDfi8Zn0-JQSRDX9n0",
//       "groups": "Recruiter"
//   },
//   "status": "success",
//   "message": "Token generated"
// }

// Function to target different element of login form.