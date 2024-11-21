import React from "react";
import { render, screen, waitFor } from "./../../../test-utils";
// import { render, screen, waitFor } from '@testing-library/react';
import ForgotPassword from "./ForgotPassword";
import userEvent from "@testing-library/user-event";

describe("Forget Page Test", () => {
  beforeEach(() => {
    render(<ForgotPassword />);
  });

  test("Forget Page Render Correctly", () => {
    expect(findForgetHeading()).toBeInTheDocument();
    expect(findPhoneInput()).toBeInTheDocument();
    expect(findContinueBtn()).toBeInTheDocument();
    expect(findFormElemet()).toBeInTheDocument();
  });

  test("Input field work correctly", async () => {
    await userEvent.type(findPhoneInput(), "9675891201");
    expect(findPhoneInput().value).toEqual("9675891201");
  });

  describe("when click on contunue button", () => {
    test("Forget to enter phone number", async () => {
      await userEvent.click(findContinueBtn());
      expect(findPhoneInput()).toHaveAccessibleErrorMessage(
        /mobile number is required/i
      );
    });

    test("Input wrong phone number", async () => {
      await userEvent.type(findPhoneInput(), "96758");
      await userEvent.click(findContinueBtn());
      expect(findPhoneInput()).toHaveAccessibleErrorMessage(
        /Mobile number must be at least 10 digits long/i
      );
    });

    test("Input more then 10 number", async () => {
      const handleOnSubmitMock = jest.fn();
      await userEvent.type(findPhoneInput(), "124515415451");
      findFormElemet().onsubmit = handleOnSubmitMock;
      await userEvent.click(findContinueBtn());
      expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/invalid phone number/i)).toBeInTheDocument();
    });

    // test("Input number is correct", async () => {
    //   const handleOnSubmitMock = jest.fn();
    //   await userEvent.type(findPhoneInput(), "9675891801");
    //   findFormElemet().onsubmit = handleOnSubmitMock;
    //   await userEvent.click(findContinueBtn());
    //   expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
    //   await waitFor(() => {
    //     expect(screen.getByText(/Enter the verification code we sent to your phone number/i)).toBeInTheDocument();
    //   });
    // });
  });
});

function findPhoneInput() {
  return screen.getByRole("textbox");
}

function findContinueBtn() {
  return screen.getByRole("button", {
    name: /continue/i,
  });
}

function findForgetHeading() {
  return screen.getByRole("heading", {
    name: /forgot your password\?/i,
  });
}

function findFormElemet(){
  return screen.getByRole("form", {
    name: /form-main/i,
  });
} 