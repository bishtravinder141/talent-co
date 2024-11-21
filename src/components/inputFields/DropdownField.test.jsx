import { render, fireEvent, act, screen, waitFor } from "./../../../test-utils";
import DropdownField from "./DropdownField";

describe("DropDownField", () => {
  const option = ["Option 1", "Option 2", "Option 3"];
  const icon = "icon.png";
  const selected = "Select an option";
  const handleOnChange = jest.fn();
  const validation = { required: true };
  const disabledField = false;

  describe("DropDown Basic Teting", () => {
    beforeEach(() => {
      act(() => {
        render(
          <DropdownField
            option={option}
            icon={icon}
            selected={selected}
            handleOnChange={handleOnChange}
            validation={validation}
            disabledField={disabledField}
          />
        );
      });
    });

    it("renders the component with the correct props", () => {
      expect(screen.getByText(selected)).toBeInTheDocument();
      expect(dropDownSelectOption()).toHaveClass("form-control");
      expect(dropDownSelectOption()).toHaveClass("language-field");
      expect(dropDownSelectOption()).not.toBeDisabled();
      expect(screen.getByRole("img")).toHaveAttribute("src", icon);
    });

    it("calls handleOnChange when an option is selected", () => {
      fireEvent.change(dropDownSelectOption(), { target: { value: option[0] } });
      expect(handleOnChange).toHaveBeenCalledTimes(1);
      expect(handleOnChange).toHaveBeenCalledWith(option[0]);
    });
  });

  it("disables the select element when disabledField is true", () => {
    const { getByRole } = render(
      <DropdownField
        option={option}
        icon={icon}
        selected={selected}
        handleOnChange={handleOnChange}
        validation={validation}
        disabledField
      />
    );

    expect(getByRole("combobox")).toBeDisabled();
  });
});


const dropDownSelectOption = () => {
  return screen.getByRole("combobox")
}