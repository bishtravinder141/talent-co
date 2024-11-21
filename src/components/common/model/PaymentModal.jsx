import React, { useState } from "react";
import {
  PAYMENTMETHODS,
  PAYMENT_METHODS,
} from "../../../pages/job/settings/constant";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../errorMsg/ErrorMessage";
import { upgradeSubscription } from "../../../API/recruitersApi";
import PageLoader from "../../loader/PageLoader";

const PaymentModal = ({
  showModal,
  toggleModal,
  title,
  planInfo,
  handleUpgradeSubscription,
  loader
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value) => {
    const payload = {
      ...value,
      plan_id:
        value?.payment_method === "stripe"
          ? planInfo?.stripe_product_id
          : planInfo?.paypal_product_id,
    };
    handleUpgradeSubscription(payload);
  };
  return (
    <>
      <div>
        <div
          className={`modal ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          id="skillPopup"
          tabIndex="-1"
          aria-labelledby="skillPopupLabel"
          aria-hidden="true"
          // data-bs-backdrop="static"
          data-ds-keyboard="false"
        >
            {loader && <PageLoader  />}
          <div className={`modal-dialog modal-dialog-centered modal-lg`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-content">
                {" "}
                <div className="modal-header">
                  <h4 className="modal-title" id="skillPopupLabel">
                    {title}
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleModal}
                  ></button>
                </div>
                {/* payment gateway  */}
                <div className="row pt-4 added-payment-card">
                  <div className="col-lg-4 col-12">
                    <h5>Payment Method</h5>
                    <div className="select-types">
                      {PAYMENTMETHODS.map(
                        ({ title, cardNumber, imageName, value }) => (
                          <div className="types-col">
                            <div className="inputype-col">
                              <input
                                type="radio"
                                name="payment_method"
                                className="radio-btn"
                                id="card-selected"
                                defaultChecked=""
                                value={value}
                                {...register("payment_method", {
                                  required:
                                    "Payment method is not selected",
                                })}
                              />
                              <span>
                                <img src="/assets/images/checked-icon.svg" />
                              </span>
                            </div>
                            <div className="payement-card">
                              <span>{title}</span>
                              <div className="paymentCardDetail">
                                <div className="payement-card-img">
                                  <img src={`/assets/images/${imageName}`} />
                                </div>
                                <div className="payment-card-number">
                                  {cardNumber}
                                </div>
                              </div>
                              {/* <button className="remove-card">
                                <img src="/assets/images/minus-icon.svg" />
                              </button> */}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="col-lg-8 col-12">
                    <div className="orderSummary">
                      <h5>Order Summary</h5>
                      {/* <ul>
                        <li>
                          Delivery Time <span>11, Aug 2023 11:00 AM</span>
                        </li>
                        <li>
                          Invoice <span>783-473-fgd-627</span>
                        </li>
                      </ul> */}
                      <ul>
                        {/* <li>
                          Discount <span>0%</span>
                        </li> */}
                        {/* <li>
                          Subtotal <span>$100</span>
                        </li> */}
                        <li>
                          Plan Price <span>${planInfo?.plan_price}</span>
                        </li>
                      </ul>
                      <ul className="subtotal">
                        {/* <li>
                          Total <span>$120</span>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 text-center">
                    {errors?.payment_method && (
                      <ErrorMessage msg={errors?.payment_method?.message} />
                    )}
                    <button
                      type="submit"
                      className="btn-design"
                    >
                      Continue
                    </button>
                  </div>
                </div>
                {/* payment gateway */}
              </div>
            </form>
          </div>
        </div>
        <div
          className={`modal-backdrop fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        ></div>
      </div>
    </>
  );
};

export default PaymentModal;
