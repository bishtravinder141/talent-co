import React, { useEffect, useState } from "react";
import { getCompanyProfile } from "../../API/candidateProfile";
import { Link } from "react-router-dom";
import { APPLICATION_BASE_URL } from "../../config/APIConfig";
import PageLoader from "../../components/loader/PageLoader";
import { useDispatch } from "react-redux";
import { updateCompanyDetails } from "../../redux/recruiterSlice";

const data = {
  id: "87e4b3e9-f6d6-4573-b576-0fa3231b8322",
  user: "+918109912928",
  created_at: "2023-10-20T13:10:16.103136Z",
  updated_at: "2023-10-20T13:15:16.973422Z",
  is_active: true,
  company_name: "test company 2",
  summary: "",
  values_and_culture: "",
  website_link: null,
  linkedin_link: null,
  company_size: null,
  revenue_currency_symbol: null,
  revenue_currency_name: null,
  revenue_amount: null,
  revenue_tenure: null,
  logo: null,
  banner_img: null,
  sectors: [
    {
      id: 1,
      created_at: "2023-10-20T09:24:13.030366Z",
      updated_at: "2023-10-20T09:24:13.030403Z",
      is_active: true,
      name: "Food and Agriculture",
    },
  ],
  markets: [
    {
      id: 1,
      created_at: "2023-10-20T09:23:25.839186Z",
      updated_at: "2023-10-20T09:23:25.839214Z",
      is_active: true,
      name: "Market 1",
    },
  ],
  location: [
    {
      id: 2,
      name: "Andorra la Vella",
      latitude: "42.50779",
      longitude: "1.52109",
      feature_code: "PPLC",
      timezone: "Europe/Andorra",
      country: 1,
      region: 6,
      country_name: "Andorra",
      region_name: "Andorra la Vella",
    },
    {
      id: 1,
      name: "les Escaldes",
      latitude: "42.50729",
      longitude: "1.53414",
      feature_code: "PPLA",
      timezone: "Europe/Andorra",
      country: 1,
      region: 7,
      country_name: "Andorra",
      region_name: "Escaldes-Engordany",
    },
  ],
};

function ViewCompanyDetail() {
  const [companyDetails, setCompanyDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    getCompanyProfile()
      .then((res) => {
        dispatch(updateCompanyDetails(res?.data?.data))
        setCompanyDetails(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  return (
    <>
      {loader && <PageLoader />}
      <section className="view-company-profile-sec py-60">
        <div className="container">
          <div className="pb-4">
            <div className="row">
              <div className="col-12 pb-4">
                <div className="back-arrow-heading d-flex font-weight-bold align-items-center justify-content-between">
                  <div className="d-flex">
                    <Link to={-1}>
                      <img src="assets/images/back-arrow.svg" alt="img1" />
                    </Link>
                    <h3 className="ms-3">{companyDetails?.company_name}</h3>
                  </div>
                  <div>
                      <Link className="btn-design btn-small" to="/job-recruiter/complete-company-profile">
                        Edit
                      </Link>
                  </div>
                </div>
              </div>

              <div
                className="col-12 pb-4 hiring-banner"
                style={{ maxHeight: "170px" }}
              >
                <img
                  style={{ height: "100%" }}
                  src={`${
                    companyDetails?.banner_img
                      ? `${APPLICATION_BASE_URL}${companyDetails?.banner_img}`
                      : "assets/images/hiring-banner.jpg"
                  }`}
                  alt="img2"
                />
              </div>

              <div className="col-12">
                <div className="view-profile-items">
                  <div className="profile_image me-4">
                    <img
                      src={`${
                        companyDetails?.logo
                          ? `${APPLICATION_BASE_URL}${companyDetails?.logo}`
                          : "assets/images/company-logo.png"
                      }`}
                      alt="img3"
                    />
                  </div>

                  <div className="profileInfocol CompanyPRofil">
                    <div className="profileInfo">
                      {/* <h4>Berkshire Hathaway</h4> */}
                      <h4>{companyDetails?.company_name}</h4>

                      <div className="companyproinfo">
                        <div className="row">
                          <div className="col-lg-5 col-12">
                            <ul>
                              <li>
                                <span><b>Company Size</b></span>{" "}
                                <span>{companyDetails?.company_size ? companyDetails?.company_size : "11-20"}</span>{" "}
                                {/* <strong>10,001+ employees</strong>{" "} */}
                              </li>
                              <li>
                                <span><b>Revenue</b></span>{" "}
                                {/* <strong>$1,000,000 - $3,000,000</strong>{" "} */}
                                <span>
                                  {companyDetails?.revenue_amount}
                                </span>{" "}
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-7 col-12">
                            <ul>
                              <li>
                                <span><b>Sectors</b></span>{" "}
                                <span>
                                  {companyDetails?.sectors?.length > 0 && companyDetails?.sectors[0]?.name}
                                  {/* Food and Agriculture, Carbon Technologies */}
                                </span>{" "}
                              </li>
                              <li>
                                <span><b>Markets</b></span>{" "}
                                <span>
                                  {companyDetails?.markets?.length > 0 && companyDetails?.markets[0]?.name}
                                  {/* NYSE Chicago, Chicago Mercantile */}
                                </span>{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="user-social">
                      <a href="#">
                        <img src="assets/images/linkedin-icon.svg" alt="img5" />
                      </a>
                      <a href="#">
                        <img src="assets/images/website-icon.svg" alt="img5" />
                      </a>
                    </span>

                    <div className="company-sub-info">
                      <div className="row">
                        <div className="col-md-8 col-12">
                          <div className="company-sub-info-inner">
                            <div className="sub-info-col">
                              <span><b>Address</b></span>
                              <p>
                                <strong>
                                  {companyDetails?.location}
                                </strong>
                              </p>
                            </div>
                            <div className="sub-info-col">
                              <span><b>Contact Details</b></span>
                              <p>
                                <strong>{companyDetails?.phone_number}</strong>
                              </p>
                            </div>
                            <div className="sub-info-col">
                              <span><b>Email</b></span>
                              <p>
                                <strong>
                                  <a href={`mailto:${companyDetails?.email}`}>
                                    {companyDetails?.email}
                                  </a>
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-md-12 col-12 mb-5">
                          <div className="complete-profile-right text-end">
                            <a href="#" className="btn-design btn-small">
                              Message
                            </a>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-overviewtabs">
              <div className="container">
                <div className="row">
                  <div className="col-12 pb-5">
                    <div className="overviewtabs">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="overview-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#overview"
                            type="button"
                            role="tab"
                            aria-controls="overview"
                            aria-selected="true"
                          >
                            Overview
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="people-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#people"
                            type="button"
                            role="tab"
                            aria-controls="people"
                            aria-selected="false"
                          >
                            People
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="funding-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#funding"
                            type="button"
                            role="tab"
                            aria-controls="funding"
                            aria-selected="false"
                          >
                            Funding
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="salaries-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#salaries"
                            type="button"
                            role="tab"
                            aria-controls="salaries"
                            aria-selected="false"
                          >
                            Salaries
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="job-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#job"
                            type="button"
                            role="tab"
                            aria-controls="job"
                            aria-selected="false"
                          >
                            Jobs
                          </button>
                        </li>
                      </ul>
                      <p>
                        Fusce ut lacinia enim. Pellentesque porta posuere dolor
                        non varius.{" "}
                      </p>
                      <div className="tab-content border-top" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="overview"
                          role="tabpanel"
                          aria-labelledby="overview-tab"
                        >
                          <div className="shadow-box">No data found</div>
                          {/* <div className="shadow-box">
                            <h3>Berkshire Hathaway careers</h3>
                            <p>
                              Fusce ut lacinia enim. Pellentesque porta posuere
                              dolor non varius. Mauris ultrices, nisi vitae
                              lacinia posuere, lectus purus eleifend tellus, et
                              convallis ligula metus ut sapien. Sed a maximus
                              orci. Vestibulum vulputate venenatis mi non
                              fermentum. Sed semper metus ut finibus rhoncus.
                              Phasellus eleifend vulputate mauris, sit amet
                              viverra est malesuada tincidunt. Duis id nunc
                              tincidunt, porta velit sed, finibus ligula. In
                              varius malesuada mauris, at ultrices ipsum
                              fermentum at. Nulla non augue eget mi ultricies
                              aliquet. Aenean blandit diam arcu.
                            </p>

                            <p>
                              Duis leo metus, bibendum vitae porttitor eu,
                              auctor et odio. Maecenas fringilla metus vitae
                              elit accumsan pretium condimentum quis leo. Sed at
                              posuere odio. Pellentesque habitant morbi
                              tristique senectus et netus et malesuada fames ac
                              turpis egestas sit amet viverra est malesuada
                              tincidunt. Duis id nunc tincidunt, porta velit
                              sed, finibus ligula. In varius malesuada mauris,
                              at ultrices ipsum fermentum at. Nulla non augue
                              eget mi ultricies aliquet. Aenean blandit diam
                              arcu......
                            </p>
                          </div> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="people"
                          role="tabpanel"
                          aria-labelledby="people-tab"
                        >
                          <div className="shadow-box">No data found</div>
                          {/* <div className="shadow-box">
                            <h3>PEOPLE</h3>
                            <p>
                              Fusce ut lacinia enim. Pellentesque porta posuere
                              dolor non varius. Mauris ultrices, nisi vitae
                              lacinia posuere, lectus purus eleifend tellus, et
                              convallis ligula metus ut sapien. Sed a maximus
                              orci. Vestibulum vulputate venenatis mi non
                              fermentum. Sed semper metus ut finibus rhoncus.
                              Phasellus eleifend vulputate mauris, sit amet
                              viverra est malesuada tincidunt. Duis id nunc
                              tincidunt, porta velit sed, finibus ligula. In
                              varius malesuada mauris, at ultrices ipsum
                              fermentum at. Nulla non augue eget mi ultricies
                              aliquet. Aenean blandit diam arcu.
                            </p>

                            <p>
                              Duis leo metus, bibendum vitae porttitor eu,
                              auctor et odio. Maecenas fringilla metus vitae
                              elit accumsan pretium condimentum quis leo. Sed at
                              posuere odio. Pellentesque habitant morbi
                              tristique senectus et netus et malesuada fames ac
                              turpis egestas sit amet viverra est malesuada
                              tincidunt. Duis id nunc tincidunt, porta velit
                              sed, finibus ligula. In varius malesuada mauris,
                              at ultrices ipsum fermentum at. Nulla non augue
                              eget mi ultricies aliquet. Aenean blandit diam
                              arcu......
                            </p>
                          </div> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="funding"
                          role="tabpanel"
                          aria-labelledby="funding-tab"
                        >
                          <div className="shadow-box">No data found</div>
                          {/* <div className="shadow-box">
                            <h3>FUNDING</h3>
                            <p>
                              Fusce ut lacinia enim. Pellentesque porta posuere
                              dolor non varius. Mauris ultrices, nisi vitae
                              lacinia posuere, lectus purus eleifend tellus, et
                              convallis ligula metus ut sapien. Sed a maximus
                              orci. Vestibulum vulputate venenatis mi non
                              fermentum. Sed semper metus ut finibus rhoncus.
                              Phasellus eleifend vulputate mauris, sit amet
                              viverra est malesuada tincidunt. Duis id nunc
                              tincidunt, porta velit sed, finibus ligula. In
                              varius malesuada mauris, at ultrices ipsum
                              fermentum at. Nulla non augue eget mi ultricies
                              aliquet. Aenean blandit diam arcu.
                            </p>

                            <p>
                              Duis leo metus, bibendum vitae porttitor eu,
                              auctor et odio. Maecenas fringilla metus vitae
                              elit accumsan pretium condimentum quis leo. Sed at
                              posuere odio. Pellentesque habitant morbi
                              tristique senectus et netus et malesuada fames ac
                              turpis egestas sit amet viverra est malesuada
                              tincidunt. Duis id nunc tincidunt, porta velit
                              sed, finibus ligula. In varius malesuada mauris,
                              at ultrices ipsum fermentum at. Nulla non augue
                              eget mi ultricies aliquet. Aenean blandit diam
                              arcu......
                            </p>
                          </div> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="salaries"
                          role="tabpanel"
                          aria-labelledby="salaries-tab"
                        >
                          <div className="shadow-box">No data found</div>
                          {/* <div className="shadow-box">
                            <h3>SALARIES</h3>
                            <p>
                              Fusce ut lacinia enim. Pellentesque porta posuere
                              dolor non varius. Mauris ultrices, nisi vitae
                              lacinia posuere, lectus purus eleifend tellus, et
                              convallis ligula metus ut sapien. Sed a maximus
                              orci. Vestibulum vulputate venenatis mi non
                              fermentum. Sed semper metus ut finibus rhoncus.
                              Phasellus eleifend vulputate mauris, sit amet
                              viverra est malesuada tincidunt. Duis id nunc
                              tincidunt, porta velit sed, finibus ligula. In
                              varius malesuada mauris, at ultrices ipsum
                              fermentum at. Nulla non augue eget mi ultricies
                              aliquet. Aenean blandit diam arcu.
                            </p>

                            <p>
                              Duis leo metus, bibendum vitae porttitor eu,
                              auctor et odio. Maecenas fringilla metus vitae
                              elit accumsan pretium condimentum quis leo. Sed at
                              posuere odio. Pellentesque habitant morbi
                              tristique senectus et netus et malesuada fames ac
                              turpis egestas sit amet viverra est malesuada
                              tincidunt. Duis id nunc tincidunt, porta velit
                              sed, finibus ligula. In varius malesuada mauris,
                              at ultrices ipsum fermentum at. Nulla non augue
                              eget mi ultricies aliquet. Aenean blandit diam
                              arcu......
                            </p>
                          </div> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="job"
                          role="tabpanel"
                          aria-labelledby="job-tab"
                        >
                          <div className="shadow-box">No data found</div>
                          {/* <div className="shadow-box">
                            <h3>JOBS TAB</h3>
                            <p>
                              Fusce ut lacinia enim. Pellentesque porta posuere
                              dolor non varius. Mauris ultrices, nisi vitae
                              lacinia posuere, lectus purus eleifend tellus, et
                              convallis ligula metus ut sapien. Sed a maximus
                              orci. Vestibulum vulputate venenatis mi non
                              fermentum. Sed semper metus ut finibus rhoncus.
                              Phasellus eleifend vulputate mauris, sit amet
                              viverra est malesuada tincidunt. Duis id nunc
                              tincidunt, porta velit sed, finibus ligula. In
                              varius malesuada mauris, at ultrices ipsum
                              fermentum at. Nulla non augue eget mi ultricies
                              aliquet. Aenean blandit diam arcu.
                            </p>

                            <p>
                              Duis leo metus, bibendum vitae porttitor eu,
                              auctor et odio. Maecenas fringilla metus vitae
                              elit accumsan pretium condimentum quis leo. Sed at
                              posuere odio. Pellentesque habitant morbi
                              tristique senectus et netus et malesuada fames ac
                              turpis egestas sit amet viverra est malesuada
                              tincidunt. Duis id nunc tincidunt, porta velit
                              sed, finibus ligula. In varius malesuada mauris,
                              at ultrices ipsum fermentum at. Nulla non augue
                              eget mi ultricies aliquet. Aenean blandit diam
                              arcu......
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-ralatedInfo">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-12">
                    <div className="founders">
                      <h4>Founders</h4>
                      <hr className="m-0 mb-3"/>
                      <div className="row">
                        <div className="col-6">No data found</div>
                        {/* <div className="col-6">
                          <div className="border-col">
                            <div className="founderThumb">
                              <img
                                src="assets/images/founder1.png"
                                alt="img6"
                              />
                            </div>
                            <h5>Jenny Wilson</h5>
                            <span>
                              <strong>Founder</strong>
                            </span>
                            <p>Co-founder : @berkshire</p>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="border-col">
                            <div className="founderThumb">
                              <img
                                src="assets/images/founder2.png"
                                alt="img7"
                              />
                            </div>
                            <h5>Robert Fox</h5>
                            <span>
                              <strong>Founder</strong>
                            </span>
                            <p>Co-founder : @berkshire</p>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div className="funding">
                      <h4>Funding</h4>
                      <hr className="m-0 mb-3"/>
                      <div className="row">
                        <div className="col-6">No data found</div>
                      </div>
                      {/* <div className="row">
                        <div className="col-md-4 col-6">
                          <div className="border-col">
                            <h5>TOTAL RAISED</h5>
                            <span>
                              <strong>$11.3B</strong>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4 col-6">
                          <div className="border-col">
                            <h5>FUNDED OVER</h5>
                            <span>
                              <strong>20 rounds</strong>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4 col-6">
                          <div className="border-col">
                            <h5>LATEST ROUND</h5>
                            <span>
                              <strong>IPO (Nov 2020)</strong>
                            </span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-md-4 col-12">
                    <div className="viewed-also">
                      <h4>People also viewed</h4>
                      <div className="border-col">
                        <div className="skill-profile-col">No data found</div>
                        {/* <div className="skill-profile-col">
                          <div className="skill-profile-icon">
                            <span>
                              <img
                                src="assets/images/view-tags.svg"
                                alt="img8"
                              />
                            </span>
                          </div>
                          <div className="skill-profile-content">
                            <h6>McKesson Corporation</h6>
                            <p>Sydney, NSW</p>
                          </div>
                        </div>
                        <div className="skill-profile-col">
                          <div className="skill-profile-icon">
                            <span>
                              <img
                                src="assets/images/view-tags.svg"
                                alt="img9"
                              />
                            </span>
                          </div>
                          <div className="skill-profile-content">
                            <h6>Amerisource Bergen</h6>
                            <p>Sydney, NSW</p>
                          </div>
                        </div>
                        <div className="skill-profile-col">
                          <div className="skill-profile-icon">
                            <span>
                              <img
                                src="assets/images/view-tags.svg"
                                alt="img12"
                              />
                            </span>
                          </div>
                          <div className="skill-profile-content">
                            <h6>Elevance Health</h6>
                            <p>Sydney, NSW</p>
                          </div>
                        </div>
                        <div className="skill-profile-col">
                          <div className="skill-profile-icon">
                            <span>
                              <img
                                src="assets/images/view-tags.svg"
                                alt="img11"
                              />
                            </span>
                          </div>
                          <div className="skill-profile-content">
                            <h6>JP Morgan Chase</h6>
                            <p>Sydney, NSW</p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pt-4">
                  <div className="col-12">
                    <div className="company-reviews shadow-box">
                      <h4>Company Reviews</h4>
                      <div className="reiviews-col">No data found</div>
                      {/* <div className="reiviews-col">
                        <div className="review-thumb">
                          <img
                            src="assets/images/user-profile.svg"
                            alt="img18"
                          />
                        </div>
                        <div className="reviews-content">
                          <div className="reviewauthorname">
                            <h5>Phil Rozek</h5>
                            <div className="rating">
                              <img src="assets/images/rating.svg" alt="img13" />
                            </div>
                          </div>
                          <span>In the last week</span>
                          <p>
                            Proin a tempor velit. Maecenas mattis nisl id
                            aliquet rutrum. Quisque suscipit, sapien in ornare
                            porttitor, mi libero sagittis purus, in porta nunc
                            odio vitae ligula.Proin a tempor velit. Maecenas
                            mattis nisl id aliquet rutrum. Quisque suscipit,
                            sapien in ornare porttitor, mi libero sagittis
                            purus, in porta nunc odio vitae ligula.
                          </p>
                        </div>
                      </div>
                      <div className="reiviews-col">
                        <div className="review-thumb">
                          <img
                            src="assets/images/user-profile.svg"
                            alt="img14"
                          />
                        </div>
                        <div className="reviews-content">
                          <div className="reviewauthorname">
                            <h5>Phil Rozek</h5>
                            <div className="rating">
                              <img src="assets/images/rating.svg" alt="img15" />
                            </div>
                          </div>
                          <span>In the last week</span>
                          <p>
                            Proin a tempor velit. Maecenas mattis nisl id
                            aliquet rutrum. Quisque suscipit, sapien in ornare
                            porttitor, mi libero sagittis purus, in porta nunc
                            odio vitae ligula.Proin a tempor velit. Maecenas
                            mattis nisl id aliquet rutrum. Quisque suscipit,
                            sapien in ornare porttitor, mi libero sagittis
                            purus, in porta nunc odio vitae ligula.
                          </p>
                        </div>
                      </div>
                      <div className="reiviews-col">
                        <div className="review-thumb">
                          <img
                            src="assets/images/user-profile.svg"
                            alt="img16"
                          />
                        </div>
                        <div className="reviews-content">
                          <div className="reviewauthorname">
                            <h5>Phil Rozek</h5>
                            <div className="rating">
                              <img src="assets/images/rating.svg" alt="img17" />
                            </div>
                          </div>
                          <span>In the last week</span>
                          <p>
                            Proin a tempor velit. Maecenas mattis nisl id
                            aliquet rutrum. Quisque suscipit, sapien in ornare
                            porttitor, mi libero sagittis purus, in porta nunc
                            odio vitae ligula.Proin a tempor velit. Maecenas
                            mattis nisl id aliquet rutrum. Quisque suscipit,
                            sapien in ornare porttitor, mi libero sagittis
                            purus, in porta nunc odio vitae ligula.
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewCompanyDetail;
