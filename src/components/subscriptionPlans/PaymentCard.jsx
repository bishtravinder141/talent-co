import React from "react";

const PaymentCard = ({ payment }) => {
  return (
    <div class="col-md-4 col-12">
      <div class="types-col">
        <div class="inputype-col">
          <input
            type="radio"
            name="login-type"
            class="radio-btn"
            id="card-selected"
            checked
          />
          <span>
            <img src="/assets/images/checked-icon.svg" />
          </span>
        </div>

        <div class="payement-card">
          <span>{payment.name}</span>
          <div class="paymentCardDetail">
            <div class="payement-card-img">
              <img src={`/assets/images/${payment.icon}.svg`} />
            </div>
            <div class="payment-card-number">{payment.cardNumber}</div>
          </div>
          <button class="remove-card">
            <img src="/assets/images/minus-icon.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
