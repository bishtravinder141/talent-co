import {
  render,
  act,
  screen,
  waitFor,
  logRoles,
} from "./../../../../test-utils";

import DashboardCreateJob from ".";
import userEvent from "@testing-library/user-event";

describe.skip("Create Job Post Testing", () => {
  beforeEach(() => {
    act(() => {
      render(<DashboardCreateJob />);
    });
  });

  it("Does interface render with page load", () => {
    expect(screen.getByText("Post a Job")).toBeInTheDocument();
  });

  it("if all input field present", () => {
    expect(findTitltInput()).toBeInTheDocument();
    expect(findJobTypeInput()).toBeInTheDocument();
    expect(findExperienceInput()).toBeInTheDocument();
    expect(findJobRoleInput()).toBeInTheDocument();
    expect(findAboutCompanyInput()).toBeInTheDocument();
    expect(findRoleDetailsInput()).toBeInTheDocument();
    expect(findCultureInput()).toBeInTheDocument();
    expect(addSkillBtnElement()).toBeInTheDocument();
  });

  it("Does User can input values?", async () => {
    await userEvent.type(findTitltInput(), "Aviox@1234");
    await userEvent.type(findAboutCompanyInput(), "About Company");
    await userEvent.type(findRoleDetailsInput(), "About Role");
    await userEvent.type(findCultureInput(), "About Culture");

    expect(findTitltInput().value).toEqual("Aviox@1234");
    expect(findAboutCompanyInput().value).toEqual("About Company");
    expect(findRoleDetailsInput().value).toEqual("About Role");
    expect(findCultureInput().value).toEqual("About Culture");
  });

  describe("Skill section modal", () => {
    beforeEach(async () => {
      await userEvent.click(addSkillBtnElement());
    });

    it("check skill model open works", async () => {
      expect(screen.getByText(/skill name/i)).toBeInTheDocument();
    });

    it("check if all input fields present", () => {
      expect(addSkillBtnElement()).toBeInTheDocument();
      expect(addSkillNameInput()).toBeInTheDocument();
      expect(addSkillDescription()).toBeInTheDocument();
      expect(addSkillExperience()).toBeInTheDocument();
      expect(skillBeginnerRadio()).toBeInTheDocument();
      expect(skillIntermediateRadio()).toBeInTheDocument();
      expect(skillExpertRadio()).toBeInTheDocument();
    });

    describe("Test case for radio buttons", () => {
      it("should select the Beginner option", async () => {
        await userEvent.click(skillBeginnerRadio());
        expect(skillBeginnerRadio()).toBeChecked();
      });

      it("should select the Intermediate option", async () => {
        await userEvent.click(skillIntermediateRadio());
        expect(skillIntermediateRadio()).toBeChecked();
      });

      it("should select the Expert option", async () => {
        await userEvent.click(skillExpertRadio());
        expect(skillExpertRadio()).toBeChecked();
      });
    });
  });

  it("End of test", async () => {
    expect(2 + 2).toBe(4);
  });
});

describe("test everyting about mounting done", () => {
  beforeEach(async () => {
    let view;
    await act(() => {
      view = render(<DashboardCreateJob />);
    });

  // await new Promise((resolve) => setTimeout(resolve, 1000));
    // logRoles(view.container);
  });

  it("Dropdown in Job Details section work correctly", async () => {
    await userEvent.selectOptions(findJobTypeInput(), "Part time");
    expect(findJobTypeInput().value).toBe("Part time");
    await userEvent.selectOptions(findJobRoleInput(), "fresher");
    expect(findJobRoleInput().value).toBe("fresher");
    await userEvent.selectOptions(findExperienceInput(), "1-3 Years");
    expect(findExperienceInput().value).toBe("1-3 Years");
  });

  it("does language selection work section correctly", async () => {
    // LANGUAGE SELECTION
    const selectLanguageDropdown = screen.getByRole("combobox", {
      name: /select_language_option/i,
    });
    const selectLanguageLevelOptions = screen.getByRole("combobox", {
      name: /select_language_level/i,
    });

    expect(selectLanguageDropdown).toBeInTheDocument();
    expect(selectLanguageLevelOptions).toBeInTheDocument();

    await act(async () => {
      await userEvent.selectOptions(selectLanguageDropdown, "English");
    });

    expect(selectLanguageDropdown.value).toBe("English");

    await act(async () => {
      await userEvent.selectOptions(selectLanguageLevelOptions, "Label 1");
    });

    expect(selectLanguageLevelOptions.value).toBe("Label 1");
  });

  it("employment selection section work correctly", async () => {
    // EMPLOYMENT OPTIONS
    const checkboxes = screen.getByRole("checkbox", {
      name: /hybrid/i,
    });

    // const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /select all/i,
    });

    // "Select All should select all checkbox"

    // Test case: Check the "Select All" checkbox
    await act(async () => {
      await userEvent.click(selectAllCheckbox);
    });

    // Test case: Check the second checkbox

    expect(checkboxes).toBeChecked();

    // Test case: Uncheck the "Select All" checkbox
    await act(async () => {
      await userEvent.click(selectAllCheckbox);
    });

    // Test case: Uncheck the second checkbox
    expect(checkboxes).not.toBeChecked();
  });

  it("Salary range section work correctly", async () => {
    // SALARY RANGE OPTIONS
    expect(FindCurrencyTypeDropdown()).toBeInTheDocument();
    expect(FindSalaryRangeMinInput()).toBeInTheDocument();
    expect(FindSalaryRangeMaxInput()).toBeInTheDocument();

    await act(async () => {
      await userEvent.selectOptions(
        FindCurrencyTypeDropdown(),
        "Euro"
      );
    });

    expect(FindCurrencyTypeDropdown().value).toBe("Euro");

    await act(async () => {
      await userEvent.type(FindSalaryRangeMinInput(), "0");
    });

    await act(async () => {
      await userEvent.type(FindSalaryRangeMaxInput(), "0");
    });

    expect(FindSalaryRangeMinInput().value).toBe("1000");
    expect(FindSalaryRangeMaxInput().value).toBe("10000");
  });
});

function findTitltInput() {
  return screen.getByRole("textbox", { name: /title/i });
}

// Dropdown Box
function findJobTypeInput() {
  return screen.getByRole("combobox", { name: /job_type/i });
}
function findJobRoleInput() {
  return screen.getByRole("combobox", { name: /job_role/i });
}
function findExperienceInput() {
  return screen.getByRole("combobox", { name: /experience/i });
}
function findAboutCompanyInput() {
  return screen.getByRole("textbox", { name: /about_company/i });
}
function findRoleDetailsInput() {
  return screen.getByRole("textbox", { name: /role_details/i });
}
function findCultureInput() {
  return screen.getByRole("textbox", { name: /culture/i });
}

// Skill Modal Testing

function addSkillBtnElement() {
  return screen.getByRole("button", {
    name: /add your skills/i,
  });
}
function addSkillNameInput() {
  return screen.getByRole("textbox", {
    name: /skill_name/i,
    hidden: true,
  });
}
function addSkillDescription() {
  return screen.getByRole("textbox", {
    name: /skill_description/i,
    hidden: true,
  });
}
function addSkillExperience() {
  return screen.getByRole("textbox", {
    name: /skill_experience/i,
    hidden: true,
  });
}
function skillBeginnerRadio() {
  return screen.getByRole("radio", {
    name: /skill_beginner/i,
    hidden: true,
  });
}
function skillIntermediateRadio() {
  return screen.getByRole("radio", {
    name: /skill_intermediate/i,
    hidden: true,
  });
}
function skillExpertRadio() {
  return screen.getByRole("radio", {
    name: /skill_expert/i,
    hidden: true,
  });
}

function FindCurrencyTypeDropdown() {
  return screen.getByRole("combobox", {
    name: /currency_type/i,
  });
}

function FindSalaryRangeMinInput() {
  return screen.getByRole("textbox", {
    name: /salary_range_min/i,
  });
}

function FindSalaryRangeMaxInput() {
  return screen.getByRole("textbox", {
    name: /salary_range_max/i,
  });
}
