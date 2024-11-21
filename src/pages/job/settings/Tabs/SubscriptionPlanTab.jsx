import React, { useEffect, useState } from "react";
import PlansCard from "../../../../components/subscriptionPlans/PlansCard";
import { getAllPlansApi, getPlanFeatures, upgradeSubscription } from "../../../../API/recruitersApi";
import { toastMessage } from "../../../../utils/toastMessages";
import { failureMessage } from "../../../../utils/allToastMessage";
import { PLANS } from "../constant";
import PaymentCard from "../../../../components/subscriptionPlans/PaymentCard";
import { PAYMENT_CARDS_DETAILS } from "../../../../constants/Constent";
import SubscriptionFeatureTable from "../../../../components/subscriptionPlans/SubscriptionFeatureTable";
import PaymentModal from "../../../../components/common/model/PaymentModal";
import SuccessModal from "../../../../components/common/model/successModal";
import PageLoader from "../../../../components/loader/PageLoader";

const SubscriptionPlanTab = () => {
  const [planDetails, setPlaneDetails] = useState([]);
  const [plansPer, setPlansPer] = useState("month");
  const [planFeatures, setPlanFeatures] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentModalInfo, setPaymentModalInfo] = useState({
    showPaymentModal: false,
    planInfo: null,
  });
  const [loader,setLoader] = useState(false);
  const togglePaymentModal = () => {
    setPaymentModalInfo({
      ...paymentModalInfo,
      showPaymentModal: !paymentModalInfo.showPaymentModal,
    });
  };

  //for handling upgrade buton inside plan cards
  const handleUpgrade = (planInfo) => {
    setPaymentModalInfo({ showPaymentModal: true, planInfo: planInfo });
  };

  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
    setPaymentModalInfo({ planInfo: null, showPaymentModal: false });
  };

  useEffect(() => {
    if (planDetails.length === 0) {
      handleGetPlans();
    }
    getPlanFeatures()
      .then((res) => {
        setPlanFeatures(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //for api call inside payment modal
  const handleUpgradeSubscription = (payload) => {
    setLoader(true);
    upgradeSubscription(payload)
    .then((res)=>{
      toggleSuccessModal();
      setLoader(false);

    })
    .catch((err)=>{
      console.log(err);
      togglePaymentModal();
      toastMessage(failureMessage);
      setLoader(false);
    })
  }

  const handleGetPlans = () => {
    setLoader(true);
    getAllPlansApi()
    .then((data) => {
      const temp = [...data?.data?.data];
      const index = temp.findIndex((curElem) => curElem?.plan_selected);
      const starterIndex = temp.findIndex(
        (curElem) => curElem?.name === "starter"
      );
      if (index < 0) {
        temp[starterIndex].plan_selected = true;
      }
      setPlaneDetails(temp);
    })
    .catch((error) => {
      toastMessage(failureMessage);
    })
    .finally(() => {
      setLoader(false);
    });
  }
  return (
    <>
      <div
        className="tab-pane fade" 
        id="subscriptionPlans"
        role="tabpanel"
        aria-labelledby="subscriptionPlans-tab"
      >
        <div className="text-center plans-tabs">
          <nav>
            {/* <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className={`nav-link ${
                plansPer === PLANS.MONTHLY ? "active" : ""
              }`}
              onClick={() => setPlansPer(PLANS.MONTHLY)}
            >
              Monthly
            </button>
            <button
              className={`nav-link ${
                plansPer === PLANS.YEARLY ? "active" : ""
              }`}
              onClick={() => setPlansPer(PLANS.YEARLY)}
            >
              Yearly
            </button>
          </div> */}
          </nav>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="row">
                {planDetails?.map((plan) => (
                  <PlansCard
                    plan={plan}
                    plansPer={plansPer}
                    togglePaymentModal={togglePaymentModal}
                    handleUpgrade={handleUpgrade}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* feature table */}
        <div className="global-table table-responsive">
          <SubscriptionFeatureTable
            planFeatures={planFeatures}
            avaliablePlans={planDetails}
          />
        </div>
      </div>
      {paymentModalInfo?.showPaymentModal ? (
        <PaymentModal
          title="Select For Payment"
          showModal={paymentModalInfo?.showPaymentModal}
          toggleModal={togglePaymentModal}
          planInfo={paymentModalInfo?.planInfo}
          toggleSuccessModal={toggleSuccessModal}
          handleUpgradeSubscription = {handleUpgradeSubscription}
          loader = {loader}
        />
      ) : (
        showSuccessModal && (
          <SuccessModal
            showModal={showSuccessModal}
            toggleModal={toggleSuccessModal}
            isPaymentSuccessModal = {true}
          >
            <h4>Success! You're now subscribed</h4>
            <p>
              You've been successfully subscribed! check your inbox soon for
              great email from this sender.
            </p>
          </SuccessModal>
        )
      )}
    </>
  );
};

export default SubscriptionPlanTab;
