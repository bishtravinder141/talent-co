import moment from "moment";

// For converting the array into query params
export const buildQueryFromSelectedFilters = (queryData) => {
  const queryParts = [];

  for (const key in queryData) {
    const value = queryData[key];

    if (Array.isArray(value)) {
      if (value.length > 0) {
        queryParts.push(value.map((item) => `${key}=${item}`).join("&"));
      }
    } else if (typeof value === "object") {
      const subQueryParts = [];
      for (const subKey in value) {
        const subValue = value[subKey];
        if (subValue !== "") {
          subQueryParts.push(`${subKey}=${subValue}`);
        }
      }
      if (subQueryParts.length > 0) {
        queryParts.push(subQueryParts.join("&"));
      }
    } else if (value !== "") {
      queryParts.push(`${key}=${value}`);
    }
  }

  return `${queryParts.join("&")}`;
};

// Converted the array into array of object for used in react select
export const convertToReactSelectOptions = (arr, forValue, forLabel) => {
  if (arr?.length > 0) {
    const transformedArray = arr.map((item) => ({
      value: forValue ? item[forValue] : item,
      label: forLabel ? item[forLabel] : item,
    }));
    return transformedArray;
  } else {
    return [];
  }
};

// calculate time ago from current time
export const calculateTimeAgo = (time) => {
  return moment(time).fromNow();
};

// To check object has keys
export const isEmpty = (value) => {
  return Object.keys(value).length === 0;
};
