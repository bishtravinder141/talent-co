import React, { useEffect, useState } from "react";
import { getAllPlansApi, getPlanFeatures } from "../../API/recruitersApi";
import SubscriptionFeatureTable from "../../components/subscriptionPlans/SubscriptionFeatureTable";
import PricingCards from "../../components/pricing/PricingCards";
import ModalWrapper from "../../components/common/model/ModalWrapper";
import { useLocation } from 'react-router-dom';
import PageLoader from "../../components/loader/PageLoader";

const SubscriptionPlans = () => {
  const [avaliablePlans, setAvaliablePlans] = useState();
  const [planFeatures,setPlanFeatures] = useState([]);
  const [modalDetails, setModalDetail] = useState({
    show: false,
    title: "Rate Candidates",
  });
  const [loader,setLoader] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment');

  const toggleModal = () => {
    setModalDetail({
      show: !modalDetails.show,
      title: "Rate Candidates",
    });
  };

  useEffect(() => {

    if (paymentStatus === "true") {
      toggleModal();
    }
    setLoader(true);
    getAllPlansApi()
      .then((data) => {
        setAvaliablePlans(data?.data?.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("getMasterJobData", error.message);
      })
      .finally(() => {
        setLoader(false);
      });
      getPlanFeatures()
      .then((res)=>{
        setPlanFeatures(res?.data?.data);
      })
      .catch((err)=>console.log(err))

  }, []);

  return (
    <>
     {/* TODO */}
      {/* <header>
        <div className="header_top_bar">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="head">
                  <div className="logo">
                    <a href="index.html">
                      <img src="assets/images/logo.svg" />
                    </a>
                  </div>
                  <div className="top_right">
                    <div className="header_left">
                      <div className="top_right header_login">
                        <div className="notifications_wrapper position-relative">
                          <div className="notifications_icon position-relative">
                            <img src="assets/images/bell_icon.svg" />
                            <span className="notifications_active" />
                          </div>
                          <div
                            className="notifications_list"
                            style={{ display: "none" }}
                          >
                            <h4>Notifications</h4>
                            <ul>
                              <li>Sed commodo nulla venenatis dr, ticidunt.</li>
                              <li>
                                Sed commodo dolor, ac preum erat tincidunt.
                              </li>
                              <li>Sed commodo dolor, ac erat tincidunt.</li>
                              <li>
                                Sed commodo nulla dolo, ac erat tincidunt.
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="panel_list_thumbs">
                          <img src="assets/images/thumb1.png" />
                          <img src="assets/images/thumb2.png" />
                          <img src="assets/images/thumb3.png" />
                          <div className="thumbplus">+8</div>
                        </div>
                      </div>
                    </div>
                    <div className="menu_icon">
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      {loader && <PageLoader/>}
      <section className="subscription-plans py-60">
        <div className="container">
          <div className="pb-4">
            <div className="row">
              <div className="col-12 pb-4">
                <div className="back-arrow-heading d-flex font-weight-bold align-items-center">
                  <a href="/job-recruiter/dashboard">
                    <img src="/assets/images/back-arrow.svg" />{" "}
                  </a>
                  {/* <h3>Subscription Plans</h3> */}
                  <h3>Subscriptions</h3>
                </div>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-12 pb-3 text-center">
                {/* <h2>We offer great price plan for the application</h2> */}
                <h2>Custom pricing to suite your business</h2>
              </div>
              <div className="col-12 pb-5 text-center plans-tabs">
                {/* <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-monthly-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-monthly"
                      type="button"
                      role="tab"
                      aria-controls="nav-monthly"
                      aria-selected="true"
                    >
                      Monthly
                    </button>
                    <button
                      className="nav-link"
                      id="nav-yearly-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-yearly"
                      type="button"
                      role="tab"
                      aria-controls="nav-yearly"
                      aria-selected="false"
                    >
                      Yearly
                    </button>
                  </div>
                </nav> */}
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-monthly"
                    role="tabpanel"
                    aria-labelledby="nav-monthly-tab"
                  >
                    
                    <PricingCards avaliablePlans={avaliablePlans} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-yearly"
                    role="tabpanel"
                    aria-labelledby="nav-yearly-tab"
                  >
                    
                    <PricingCards avaliablePlans={avaliablePlans} />
                  </div>
                </div>
              </div> 
            </div>
            <div className="global-table table-responsive">
              <SubscriptionFeatureTable planFeatures={planFeatures} avaliablePlans={avaliablePlans}/>
            </div>
          </div>
        </div>
      </section>
      {/*---------------- Modal Start ----------------*/}
      <ModalWrapper
        showModal={modalDetails.show}
        title={modalDetails.modalTitle}
        toggleModal={toggleModal}
        // ifCloseButtonNeeded={false}
        modalSize="md"
      >

            <div className="modal-body">
              <div className="subscriptionpopup">
                <img src="/assets/images/sucess-icon.svg" />
                <h4>Success! You're now subscribed</h4>
                <p>
                  You've been successfully subscribed! <br /> check your inbox
                  soon for great email from this sender.
                </p>
                <a href="/job-recruiter/create-job" className="btn-design">
                  Go Back
                </a>
              </div>
            </div>

      </ModalWrapper>

      {/*---------------- Modal End ----------------*/}
    </>
  );
};

export default SubscriptionPlans;
