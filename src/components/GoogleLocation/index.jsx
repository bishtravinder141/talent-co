import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { goolgeMapApi } from "../../config/APIConfig";
import { useLocation } from "react-router-dom";

const GoogleLocation = ({ handleAddLocation,idx, selectedValue}) => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState();
  const [coordinates, setCoordinates] = useState(null);
  const path = useLocation();
  useEffect(() => {
    if (data?.label) {
      setLocation(data.label);  
    }
    if (data?.value?.place_id) {
      const place_id = data?.value?.place_id;
      handleCoordinated(place_id, data.label);
    }
  }, [data]);

  const handleCoordinated = async (placeId, loacation) => {
    try {
      const results = await geocodeByPlaceId(placeId);
      if (results.length > 0) {
        const { geometry } = results[0];
        const { location } = geometry;
        console.log("coordinates", {
          lat: location.lat(),
          lng: location.lng(),
        });
        setCoordinates({ lat: location.lat(), lng: location.lng() });

        // Send location, longitude and latitude to parent
        {
          path.pathname === "/job-seeker/setting"
            ? handleAddLocation(idx, loacation)
            : handleAddLocation(loacation, location.lat(), location.lng());
        }
      }
    } catch (error) { 
      console.error("Error geocoding place ID:", error);
    }
  };

  return (
    <>
        <GooglePlacesAutocomplete
          apiKey={process.env.VITE_GOOGLE_MAP_API}
          debounce={1000}
          autocompletionRequest={
            {
              //   componentRestrictions: {
              //     country: ["ng"], //to set the specific country
              //   },
            }
          }
          selectProps={{ //set default value
            value: {label: selectedValue, value: selectedValue},
            onChange: setData, //save the value gotten from google
            placeholder:"Enter location",
          }}
          onLoadFailed={(error) => {
            console.log(error);
          }}
        />
    </>
  );
};

export default GoogleLocation;
