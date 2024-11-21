import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function PaymentGateway() {
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
                      <img src="/assets/images/logo.svg" />
                    </a>
                  </div>
                  <div className="top_right">
                    <div className="header_left">
                      <div className="top_right header_login">
                        <div className="notifications_wrapper position-relative">
                          <div className="notifications_icon position-relative">
                            <img src="/assets/images/bell_icon.svg" />
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
                          <img src="/assets/images/thumb1.png" />
                          <img src="/assets/images/thumb2.png" />
                          <img src="/assets/images/thumb3.png" />
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
      <section className="subscription-plans py-60">
        <div className="container">
          <div className="pb-4">
            <div className="row">
              <div className="col-12 pb-4">
                <div className="back-arrow-heading d-flex font-weight-bold align-items-center">
                  <Link to = "/job-recruiter/dashboard-setting"  aria-label="select subscription plan" >
                    <img src="/assets/images/back-arrow.svg" />{" "}
                  </Link>
                  <h3>Select For Payment</h3>
                </div>
              </div>
            </div>
            <div className="row pt-4 added-payment-card">
              <div className="col-lg-4 col-12">
                <h5>Payment Method</h5>
                <div className="select-types">
                  <div className="types-col">
                    <div className="inputype-col">
                      <input
                        type="radio"
                        name="login-type"
                        className="radio-btn"
                        id="card-selected"
                        defaultChecked=""
                      />
                      <span>
                        <img src="/assets/images/checked-icon.svg" />
                      </span>
                    </div>
                    <div className="payement-card">
                      <span>Stripe</span>
                      <div className="paymentCardDetail">
                        <div className="payement-card-img">
                          <img src="/assets/images/stripe.svg" />
                        </div>
                        <div className="payment-card-number">
                          **** **** **** 5643
                        </div>
                      </div>
                      <button className="remove-card">
                        <img src="/assets/images/minus-icon.svg" />
                      </button>
                    </div>
                  </div>
                  <div className="types-col">
                    <div className="inputype-col">
                      <input
                        type="radio"
                        name="login-type"
                        className="radio-btn"
                      />
                      <span>
                        <img src="/assets/images/checked-icon.svg" />
                      </span>
                    </div>
                    <div className="payement-card">
                      <span>Pay Pal</span>
                      <div className="paymentCardDetail">
                        <div className="payement-card-img">
                          <img src="/assets/images/apple-pay.svg" />
                        </div>
                        <div className="payment-card-number">
                          **** **** **** 2313
                        </div>
                      </div>
                      <button className="remove-card">
                        <img src="/assets/images/minus-icon.svg" />
                      </button>
                    </div>
                  </div>
                  {/* <div className="addMethod">
                    <div className="border-popup-btn">
                      <p>
                        <img src="/assets/images/plus-icon.svg" />
                      </p>
                      <p>Add New Card</p>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addcardPopup"
                      >
                        Add Your Skills
                      </button>
                    </div>
                    <div
                      className="modal fade"
                      id="addcardPopup"
                      tabIndex={-1}
                      aria-labelledby="addcardPopupLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title" id="addcardPopupLabel">
                              Add Card Details
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <div className="row">
                              <div className="col-12">
                                <label>Card Name</label>
                                <div className="fieldset">
                                  <input
                                    type="text"
                                    name=""
                                    placeholder="Ex: John Smith"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <label>Card Number</label>
                                <div className="fieldset">
                                  <input
                                    type="text"
                                    name=""
                                    placeholder="Ex: 1234 5678 4567 8901"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <label>CV Number</label>
                                <div className="fieldset">
                                  <input
                                    type="text"
                                    name=""
                                    placeholder="Ex: 123"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-12 mt-4">
                                <div className="popupBtn">
                                  <button
                                    type="button"
                                    className="btn-design border-btn"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button type="button" className="btn-design">
                                    Add Card
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-8 col-12">
                <div className="orderSummary">
                  <h5>Order Summary</h5>
                  <ul>
                    <li>
                      Delivery Time <span>11, Aug 2023 11:00 AM</span>
                    </li>
                    <li>
                      Invoice <span>783-473-fgd-627</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      Discount <span>0%</span>
                    </li>
                    <li>
                      Subtotal <span>$100</span>
                    </li>
                  </ul>
                  <ul className="subtotal">
                    <li>
                      Total <span>$100</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 text-center">
                <a href="/subscription-plans?payment=true"  className="btn-design">
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="site_footer">
        <div className="copyright">© 2023 TalentCo. All Rights Reserved.</div>
      </footer>
    </>
  );
}

export default PaymentGateway;
