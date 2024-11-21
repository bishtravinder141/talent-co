import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const SelectWithSearch = ({
  searchBy,
  placeholder,
  icon = "assets/images/pin.svg",
  setProfileDetails,
  profileDetails,
}) => {
  const [cityOrCountry, setCityOrCountry] = useState([]);
  const [timerValue, setTimerValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleSearch = (value) => {
    setSelectedOptions(value);
    setMenuIsOpen(false);
    const loc = value.map((vl) => {
      const value = { location: vl.label };
      return value;
    });
    setProfileDetails({
      ...profileDetails,
      job_locations: [...profileDetails.job_locations, ...loc],
    });
  };

  useEffect(() => {
    setProfileDetails({
      ...profileDetails,
      job_locations: [selectedOptions],
    });
  },[selectedOptions])
  

  useEffect(() => {
    searchBy()
      .then((res) => {
        const tempCountryName = res.data.data;
        const transformedArray = tempCountryName.map((item) => ({
          value: item.name,
          label: item.name,
          id: item.id,
        }));
        setCityOrCountry(transformedArray);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inputChange = (e) => {
    if (e) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
    // clearTimeout(timerValue);
    // const timer = setTimeout(() => {
    //   searchBy(e)
    //     .then((res) => {
    //       setCityOrCountry(res.data.data)
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }, 500);
    // setTimerValue(timer);
  };
  const NoOptionsMessage = () => {
    return (
      <p style={{ textAlign: "center", marginTop: "4px", color: "#b2afaf" }}>
        No Result Found
      </p>
    );
  };

  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={{ animatedComponents, NoOptionsMessage }}
        isMulti
        isSearchable
        isLoading={loading}
        options={cityOrCountry}
        className="form-control input-icon pin-field"
        placeholder={placeholder}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "100%", // Set the desired width
            height: "100%", // Set the desired height
          }),
        }}
        onChange={handleSearch}
        value={selectedOptions}
        onInputChange={inputChange}
        menuIsOpen={menuIsOpen}
      />
      <span className="input-field-icon">
        <img src={icon} />
      </span>
    </>
  );
};

export default SelectWithSearch;
