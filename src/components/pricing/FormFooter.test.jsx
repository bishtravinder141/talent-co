import { render, screen, fireEvent } from "@testing-library/react";
import { FormFooter } from "./FormFooter";

describe("pricing section form", () => {

  beforeEach(() => {
    render( <FormFooter />);
  })

  test("renders input fields", () => {
    // render(<FormFooter />);
    const firstNameInput = screen.getByPlaceholderText("First name");
    const lastNameInput = screen.getByPlaceholderText("Last name");
    const companyInput = screen.getByPlaceholderText("Company");
    const emailInput = screen.getByPlaceholderText("Your email");
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(companyInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("updates input field values", () => {
    // render(<FormFooter />);
    const firstNameInput = screen.getByPlaceholderText("First name");
    const lastNameInput = screen.getByPlaceholderText("Last name");
    const companyInput = screen.getByPlaceholderText("Company");
    const emailInput = screen.getByPlaceholderText("Your email");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(companyInput, { target: { value: "Acme Inc." } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(firstNameInput.value).toBe("John");
    expect(lastNameInput.value).toBe("Doe");
    expect(companyInput.value).toBe("Acme Inc.");
    expect(emailInput.value).toBe("john.doe@example.com");
  });
});
