import { useDispatch, useSelector } from "react-redux";
import { getTimeZoneListing } from "../API/masterApiData";
import { CHARACTERS_ONLY_REGEX, NUMBER_ONLY_REGEX } from "../utils/regexUtils";

// For checking only number in a string
export const useNumberOnly = (text) => {
  return NUMBER_ONLY_REGEX.test(text);
};

// For validating a string which allow only characters and single space between characters
export const useOnlyStringWithSingleSpace = (text) => {
  if (text.length > 0) {
    if (CHARACTERS_ONLY_REGEX.test(text)) {
      return text.replace(/\s+$/, "");
    }
    return false;
  } else {
    return true;
  }
};
