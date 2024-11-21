import React, { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

const UpdateGoogleLocation = ({
  selectedLocation,
  afterSelectLocation,
  styleClass,
  placeholder,
  hideIcon,
  onlySearch
}) => {
  const [location, setLocation] = useState({
    location: "",
    lat: "",
    long: "",
  });
  const [searchedText, setSearchText] = useState("");
  const { ref } = usePlacesWidget({
    apiKey: process.env.VITE_GOOGLE_MAP_API,
    onPlaceSelected: (place) => {
      // updateTheLocation(place);
      const lat = place.geometry.location.lat();
      const long = place.geometry.location.lng();
      ref.current.value = place.formatted_address;
      setLocation({ location: place.formatted_address, lat: lat, long: long });
    },
  });
  useEffect(() => {
    if (selectedLocation) {
      ref.current.value = selectedLocation;
    }
  }, [selectedLocation]);

  useEffect(() => {
    afterSelectLocation(location);
  }, [location]);

  const handleInputChange = (value) => {
    setSearchText(value);
  };

  const handleOnBlur = () => {
    if(onlySearch) {
      setLocation({ location: searchedText, lat: null, long: null })
    } else {
      ref.current.value = ""
    }
  }
  return (
    <>
      <input
        ref={ref}
        type="text"
        name="title"
        placeholder={placeholder ? placeholder : "Enter Country and City"}
        className={`${
          styleClass ? styleClass : "form-control input-icon user-field"
        }`}
        aria-label="title"
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleOnBlur}
      />
      {!hideIcon && (
        <span className="input-field-icon">
          <img src="/assets/images/location-icon.svg" />
        </span>
      )}
    </>
  );
};

export default UpdateGoogleLocation;
