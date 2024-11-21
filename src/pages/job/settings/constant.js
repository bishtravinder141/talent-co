export const settingDetails = [
  {
    title: "Interview",
    subTitle: "These are notifications for interview reminder",
    checkBox: "interview",
  },
  {
    title: "Message",
    subTitle:
      "These are notifications for Message if someone message you. You will get the notification.",
    checkBox: "message",
  },
  {
    title: "Talent Matched",
    subTitle:
      "These are notifications for Talent Matched, If some Candidates will be matched with your Posted job, You will got the notification",
    checkBox: "talent_matched",
  },
];

// Setting page tab name 
export const TAB_NAME = {
  SETTING: "Setting",
  SUBSCRIPTION: "Subscription",
};

// Setting page subscription page
export const PLANS = {
  MONTHLY: "month",
  YEARLY: "year",
};
export const PAYMENT_METHODS = {
  STRIPE:"stripe",
  PAYPAL:"paypal"
}
//constant for payment methods inside payment modal
export const PAYMENTMETHODS = [
  {
    title: "Stripe",
    cardNumber: "**** **** **** 5643",
    imageName: "stripe.svg",
    value:"stripe"
  },
  {
    title: "Pay Pal",
    cardNumber: "**** **** **** 2313",
    imageName: "paypal.png",
    value:"pay_pal"
  },
];
// notification settings tooltip messages
export const EmailNotificationMessage = "Will Send Notifications Through Email";
export const SmsNotificationMessage = "Will Send Notifications Through SMS";
export const PushNotificationMessage = "Will Send Notifications Through The Browser";

export const EmailNotificationError = "Please Add Your Email First";
export const PushNotificationError = "Please Allow To Send notifications First";
export const SmsNotificationError = "Please Add Your Phone Number First";
