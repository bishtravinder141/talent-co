import React, { useEffect, useState } from "react";
import { TEXT_AREA_MAX_LENGTH, USER_ROLE } from "../../constants/Constent";
import PageLoader from "../../components/loader/PageLoader";
import ProfilePageTopSection from "../../components/profileDetails/ProfilePageTopSection";
import { useForm } from "react-hook-form";
import {
  createCompanyProfile,
  getCompanyProfile,
  getCountryName,
  getMarketData,
  getSectorData,
  uploadCompanyLogo,
} from "../../API/candidateProfile";
import { useLocation, useNavigate } from "react-router";
import { APPLICATION_BASE_URL } from "../../config/APIConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import GoogleLocation from "../../components/GoogleLocation";
import DropDownWithSearch from "../../components/inputFields/DropDownWithSearch";
import {
  updateRecruiterData,
  updateRecruiterId,
} from "../../redux/recruiterSlice";
import { getSalaryCurrency } from "../../API/masterApiData";
import UpdateGoogleLocation from "../../components/GoogleLocation/UpdateGoogleLocation";
import { CURRENCY_LIST } from "../job/constant";
import JobRecruiterDashboardLayout from "../../layouts/job-recruiter/JobRecruiterDashboardLayout";
import { UPDATE_PROFILE_ERROR, isAllowedSubscriptionPlansAccess, isAllowedToEditProfile } from "../job/staffManagement";
import { toastMessage } from "../../utils/toastMessages";
import PermissionModal from "../../components/common/model/PermissionModal";
import RemainingCount from "../../components/common/RemainingCount";

const CompanyProfile = () => {
  const [loader, setLoader] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});
  const [sectorDetails, setSectorDetails] = useState([]);
  const [marketDetails, setMarketDetails] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);
  const [profileImage, setProfileImages] = useState({
    logo: "",
    banner_img: "",
  });
  const [imagePreview, setImagePreview] = useState({
    logo: null,
    banner_img: null,
  });
  const [showPermissionAccessModal,setShowPermissionAccessModal] = useState(false);
  const togglePermissionModal = () =>{
    setShowPermissionAccessModal(!showPermissionAccessModal);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { mobile } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetCompanyProfile();
  }, []);

  const handleGetCompanyProfile = () =>{
    setLoader(true);
    getCompanyProfile()
    .then((res) => {
      const tempData = res.data.data;
      dispatch(updateRecruiterId(res.data.data.id));
      // let location = [];
      let market = [];
      let sector = [];
      // commented for future use
      // if (tempData?.location?.length > 0) {
      //   location = tempData.location.map((item) => ({
      //     value: item.id,
      //     label: item.name,
      //   }));
      // }
      if (tempData?.markets?.length > 0) {
        market = tempData.markets.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }
      if (tempData?.sectors?.length > 0) {
        sector = tempData.sectors.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      // setSelectedCountry([...location]);
      // setSelectedMarket([...market]);
      // setSelectedSector([...sector]);

      setCompanyDetails({
        ...res?.data?.data,
        phone_number: res?.data?.data?.phone_number.replace(/[^0-9]/g, ""),
        // location: location,
        markets: market,
        sectors: sector,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
  }

  useEffect(() => {
    handleGetCompanyData();
  }, []);
  const handleGetCompanyData = () =>{
    getSectorData()
    .then((res) => {
      const tempSectorData = res.data.data;
      const transformedArray = tempSectorData.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSectorDetails(transformedArray);
    })
    .catch((err) => {
      console.log(err);
    });
  getMarketData()
    .then((res) => {
      const tempSectorData = res.data.data;
      const transformedArray = tempSectorData.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setMarketDetails(transformedArray);
    })
    .catch((err) => {
      console.log(err);
    });
  getCountryName()
    .then((res) => {
      const tempSectorData = res.data.data;
      const transformedArray = tempSectorData.map((item) => ({
        value: item.id,
        label: item.country_name,
      }));
      setCountryDetails(transformedArray);
    })
    .catch((err) => {
      console.log(err);
    });
  getSalaryCurrency()
    .then((currencyData) => {
      const tempCurrentCureny = currencyData.data.data.map(
        (curr) => `${curr.currency_name} (${curr.currency_symbol})`
      );
      setCurrencyList([...tempCurrentCureny]);
    })
    .catch((error) => {
      console.error("getSalaryCurrency", error.message);
    })
    .finally(() => {
      setLoader(false);
    });
  }

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "phone_number") {
      value = value.replace(/[^0-9]/g, "");
    }
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: value,
    });
  };

  const handleImageUploade = (event) => {
    const file = event.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      toast.error("Please upload vaild format image(jpg,jpeg,png)");
    } else {
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setImagePreview({
            ...imagePreview,
            [event.target.name]: e.target.result,
          });
        };

        reader.readAsDataURL(file);
      }
      setProfileImages({
        ...profileImage,
        [event.target.name]: event.target.files[0],
      });
    }
  };

  const setSelectedValue = (value, field) => {
    if (field === "location") {
      setCompanyDetails({
        ...companyDetails,
        [field]: [value],
      });
    } else {
      setCompanyDetails({
        ...companyDetails,
        [field]: [...value],
      });
    }
  };

  const onSubmit = () => {
    if(isAllowedToEditProfile())
    {
      setLoader(true);
      let payload = { ...companyDetails };
      if (payload?.sectors?.length > 0) {
        payload.sectors = payload.sectors.map((loc) => loc.value);
      }
      if (payload?.markets?.length > 0) {
        payload.markets = payload.markets.map((loc) => loc.value);
      }
      delete payload?.user;
      delete payload?.logo;
      delete payload?.banner_img;
      payload = {
        ...payload,
        phone_number : `+${payload.phone_number}`
      }
      createCompanyProfile(payload)
        .then((res) => {
          if (profileImage.banner_img || profileImage.logo) {
            const formData = new FormData();
            if (profileImage.banner_img) {
              formData.append("banner_img", profileImage.banner_img);
            }
            if (profileImage.logo) {
              formData.append("logo", profileImage.logo);
            }
            uploadCompanyLogo(formData)
              .then((res) => {
                navigate("/view-company-profile");
              })
              .catch((err) => {
                console.log(err, "error");
                toast.error("Something wrong in image upload");
                // Commented for future use
                // navigate("/view-company-profile");
              });
          } else {
            navigate("/view-company-profile");
          }
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setLoader(false);
        });

    }
    else{
      // handleGetCompanyProfile();
      // handleGetCompanyData();
      // toastMessage(UPDATE_PROFILE_ERROR);
      togglePermissionModal();
    }

    // Commented for future use
    // if (payload?.location?.length > 0) {
    //   payload.location = payload.location.map((loc) => loc.value);
    // }
  };

  const handleAddLocation = (location) => {
    if (location) {
      setCompanyDetails({
        ...companyDetails,
        location: location.location,
        longitude: location.long,
        latitude: location.lat,
        // Commented for future use
        // location: [...companyDetails.location, loacation],
      });
    }
  };

  const handleRemoveLocation = (name) => {
    setCompanyDetails({
      ...companyDetails,
      location: null,
      longitude: null,
      latitude: null,
      // Commented for future use
      // location: companyDetails.location.filter((loc) => loc !== name),
    });
  };
  return (
    <>
      <JobRecruiterDashboardLayout
        header={"Profile"}
        subTitle={"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at "}
        showSearchBar={false}
        profilePercentage={companyDetails?.profile_percentage}
      >
      {loader && <PageLoader />}
      <section
        className={`${
          pathname === "/job-recruiter/complete-company-profile"
            ? "dashboard-main-panel"
            : "complete-profile-sec py-60"
        }`}
      >
        <ProfilePageTopSection
          role={USER_ROLE.recruiter}
          profileDetails={companyDetails}
        />
        <div className="profile-form">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <form>
                  <div className="fieldset-heading">
                    {/* <h6>Company Information</h6> */}
                    <h6>Contact Information</h6>
                    {/* <p>Add general information about company</p> */}
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          {/* <NameInputText
                            error={errors?.first_name?.message}
                            placeholder={"Company Name"}
                            icon={"assets/images/company.svg"}
                            validation={register("company_name", {
                              // required: "First Name is required.",
                            })}
                          /> */}
                          <input
                            type="text"
                            name="company_name"
                            placeholder="Company Name"
                            className="form-control input-icon company-field"
                            value={companyDetails?.company_name}
                            onChange={(e) => handleChange(e)}
                          />
                          <span className="input-field-icon">
                            <img
                              src="/assets/images/company.svg"
                              alt="Company"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="fieldset">
                          {/* <NameInputText
                            error={errors?.email?.message}
                            placeholder={"Your Email"}
                            icon={"assets/images/email.svg"}
                            validation={register("email", {
                              // required: "Email is required.",
                              pattern: {
                                value: EMAIL_REGEX,
                                message: "Please enter a valid email",
                              },
                            })}
                          /> */}
                          <input
                            type="text"
                            placeholder="Your Email"
                            name="email"
                            className="form-control input-icon email-field"
                            value={companyDetails?.email}
                            onChange={(e) => handleChange(e)}
                          />
                          <span className="input-field-icon">
                            <img src="/assets/images/email.svg" alt="Email" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="fieldset">
                          {/* <NumberField
                            error={errors?.phone_no?.message}
                            validation={register("phone_no", {
                              // required: "Phone Number is required.",
                              pattern: {
                                value: /^\d{10}$/,
                                message: "Please enter a valid phone number",
                              },
                            })}
                          /> */}
                          <input
                            type="text"
                            placeholder="Phone Number"
                            className="form-control input-icon phone-field"
                            name="phone_number"
                            value={companyDetails?.phone_number}
                            onChange={(e) => handleChange(e)}
                          ></input>
                          <span className="input-field-icon">
                            <img src="/assets/images/phone-icon.svg" />
                          </span>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="border-top pt-4 mt-4">
                          {/* <label>Add links to your website and LinkedIn</label> */}
                          <label>Add links</label>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="fieldset">
                          <input
                            type="text"
                            placeholder="Add Website Link"
                            className="form-control input-icon website-field"
                            name="website_link"
                            value={companyDetails?.website_link}
                            onChange={(e) => handleChange(e)}
                          />
                          <span className="input-field-icon">
                            <img src="/assets/images/website-icon.svg" />
                          </span>
                          {/* <NameInputText
                            validation={register("websiteLinks", {
                              // required: "First Name is required.",
                            })}
                            placeholder={"Add Website Link"}
                            icon={"assets/images/website-icon.svg"}
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="fieldset">
                          <input
                            type="text"
                            placeholder="Add LinkedIn Link"
                            className="form-control input-icon linkedin-field"
                            name="linkedin_link"
                            value={companyDetails?.linkedin_link}
                            onChange={(e) => handleChange(e)}
                          />
                          <span className="input-field-icon">
                            <img src="/assets/images/linkedin-icon.svg" />
                          </span>
                          {/* <NameInputText
                            validation={register("linkedinLinks", {
                              // required: "First Name is required.",
                            })}
                            placeholder={"Add LinkedIn Link"}
                            icon={"assets/images/linkedin-icon.svg"}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fieldset-heading">
                    <h6>Company Specification</h6>
                    <p>Add information about company specification</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12 pb-3">
                        {/* <GoogleLocation handleAddLocation={handleAddLocation} />
                          <ul className="multi-select-list" style={{marginTop: "10px"}}>
                            {profileDetails?.job_locations?.length > 0 &&
                              profileDetails.job_locations.map((loct, index) => (
                                <li key={index}>
                                  {loct}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(loct)}
                                  >
                                    <img src="assets/images/close-icon.svg" />
                                  </button>
                                </li>
                              ))}
                          </ul> */}
                        <label>Location</label>
                        <div className="fieldset">
                          <UpdateGoogleLocation
                            afterSelectLocation={handleAddLocation}
                          />
                          {/* <GoogleLocation
                            handleAddLocation={handleAddLocation}
                          /> */}
                          <ul
                            className="multi-select-list"
                            style={{ marginTop: "10px" }}
                          >
                            {companyDetails.location && (
                              <li>
                                {companyDetails.location}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveLocation()}
                                >
                                  <img src="/assets/images/close-icon.svg" />
                                </button>
                              </li>
                            )}
                            {/* {companyDetails?.location?.length > 0 &&
                              companyDetails.location.map((loct, index) => (
                                <li key={index}>
                                  {loct}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(loct)}
                                  >
                                    <img src="/assets/images/close-icon.svg" />
                                  </button>
                                </li>
                              ))} */}
                          </ul>
                        </div>
                        {/* <div className="fieldset">
                          <div className="fieldset">
                            <DropDownWithSearch
                              list={countryDetails}
                              selectedValue={companyDetails?.location}
                              setSelectedValue={setSelectedValue}
                              placeholder={"Search Location"}
                              icon="/assets/images/search-icon.svg"
                              field={"location"}
                              isMulti={false}
                            />
                          </div>
                        </div> */}
                      </div>
                      <div className="col-12 pb-3">
                        <label>Sectors</label>
                        <div className="fieldset">
                          <DropDownWithSearch
                            list={sectorDetails}
                            selectedValue={companyDetails?.sectors}
                            setSelectedValue={setSelectedValue}
                            placeholder={"Search Sectors"}
                            icon="/assets/images/search-icon.svg"
                            field={"sectors"}
                          />
                        </div>
                      </div>

                      <div className="col-12 pb-3">
                        <label>Markets</label>
                        <div className="fieldset">
                          <DropDownWithSearch
                            list={marketDetails}
                            selectedValue={companyDetails?.markets}
                            setSelectedValue={setSelectedValue}
                            placeholder={"Search Markets"}
                            icon="/assets/images/search-icon.svg"
                            field={"markets"}
                          />
                        </div>
                      </div>
                      <div className="col-12 pb-3">
                        <label>Company Size</label>
                        <div className="fieldset">
                          <select
                            className="form-control input-icon company-field"
                            name="company_size"
                            onChange={(e) => handleChange(e)}
                            value={companyDetails?.company_size}
                          >
                            <option disabled value={""}>
                              Select a size
                            </option>
                            <option value="0-10">0-10</option>
                            <option value="11-20">11-20</option>
                            <option value="21-50">21-50</option>
                            <option value="51-100">51-100</option>
                            <option value="101-200">101-200</option>
                            <option value="201-500">201-500</option>
                            <option value="501-1000">501-1000</option>
                          </select>
                          <span className="input-field-icon">
                            <img
                              src="/assets/images/company.svg"
                              alt="Company"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-12">
                        <label>Revenue</label>
                        <div className="fieldset flex-inner">
                          <select
                            className="form-control currency-field"
                            name="revenue_currency_name"
                            onChange={(e) => setCompanyDetails({
                              ...companyDetails,
                              revenue_currency_symbol: e.target.value,
                              revenue_currency_name: CURRENCY_LIST[0].label
                            })}
                            value={sectorDetails?.revenue_currency_name}
                          >
                            <option hidden>Select the currency</option>
                            {CURRENCY_LIST.map((curr, i) => (
                              <option value={curr.title} key={i}>
                                {curr.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Enter amount"
                            className="form-control amount-field"
                            name="revenue_amount"
                            value={companyDetails?.revenue_amount}
                            onChange={(e) => handleChange(e)}
                          />
                          <select
                            className="form-control years-field"
                            name="revenue_tenure"
                            onChange={(e) => handleChange(e)}
                            value={sectorDetails?.revenue_currency_name}
                          >
                            <option value="Annual">Annual</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Weekly">Weekly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fieldset-heading">
                    <h6>Detail</h6>
                    <p>Update company logo and company details here</p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12 pb-3">
                        <div className="fieldset">
                          <div className="expert_profile_image">
                            <div className="profile_avtar">
                              <div className="upload_file_btn">
                                <input
                                  type="file"
                                  name="logo"
                                  onChange={(e) => handleImageUploade(e)}
                                />
                              </div>
                              <img
                                id="companyLogo"
                                src={`${
                                  imagePreview?.logo
                                    ? imagePreview?.logo
                                    : companyDetails?.logo
                                    ? `${APPLICATION_BASE_URL}${companyDetails?.logo}`
                                    : "/assets/images/img-placeholder.png"
                                }`}
                              />
                            </div>
                            <p>Add Company Logo</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 pb-3">
                        <div className="fieldset">
                          <div className="company-profile-banner">
                            <input
                              type="file"
                              name="banner_img"
                              onChange={(e) => handleImageUploade(e)}
                            />
                            <div className="profile_banner">
                              <div className="upload_banner"></div>
                              <img
                                id="frameBanner"
                                src={`${
                                  imagePreview?.banner_img
                                    ? imagePreview?.banner_img
                                    : companyDetails?.banner_img
                                    ? `${APPLICATION_BASE_URL}${companyDetails?.banner_img}`
                                    : "/assets/images/img-placeholder.png"
                                }`}
                              />
                            </div>
                            <p>
                              Please upload a Banner 8 MB maximum (JPEG format)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="fieldset">
                          <textarea
                            placeholder="Add Company Summary"
                            className="form-control input-icon message-field"
                            name="summary"
                            maxLength={TEXT_AREA_MAX_LENGTH}
                            value={companyDetails?.summary}
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                          <span className="characters-sets">
                            <RemainingCount typedCharacters = {companyDetails?.summary?.length}/>
                            {/* 5000 characters */}
                          </span>
                          <span className="input-field-icon">
                            <img src="/assets/images/message-icon.svg" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fieldset-heading">
                    <h6>Company Values and Culture</h6>
                    <p>
                      Describe the shared values, goals, attitudes and practices
                      that characterize your company
                    </p>
                  </div>
                  <div className="form-field shadow-box">
                    <div className="row">
                      <div className="col-12">
                        <div className="fieldset">
                          <textarea
                            placeholder="Describe to job seekers a taste of what it’s like to work here"
                            className="form-control input-icon message-field"
                            name="values_and_culture"
                            maxLength={TEXT_AREA_MAX_LENGTH}
                            value={companyDetails?.values_and_culture}
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                          <span className="characters-sets">
                            {/* 5000 characters */}
                            <RemainingCount typedCharacters={companyDetails?.values_and_culture?.length}/>
                          </span>
                          <span className="input-field-icon">
                            <img src="/assets/images/message-icon.svg" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-field pt-5">
                    <div className="row">
                      <div className="col-12 text-center">
                        <div className="fieldset d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn-design"
                            onClick={onSubmit}
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            className="btn-design border-btn"
                            onClick={() => navigate("/job-recruiter/dashboard")}
                          >
                            Do Later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      </JobRecruiterDashboardLayout>
      {
        showPermissionAccessModal && (
          <PermissionModal showModal={showPermissionAccessModal} toggleModal={togglePermissionModal} text={UPDATE_PROFILE_ERROR}/>
        )
      }
    </>
  );
};

export default CompanyProfile;
