import { useState } from "react";
import OtpInput from "react-otp-input";
import { authAxios } from "../../config/APIConfig";
import { REGISTER } from "../../config/APIUrls";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/errorMsg/ErrorMessage";
import SubmitButton from "../../components/button/SubmitButton";
import PageLoader from "../../components/loader/PageLoader";
import SelectRoleHeader from "./SelectRoleHeader";

const VerifyOTP = ({
  mobileNo,
  afterAPISuccess,
  mobileNumberScreen = {},
  APIUrl,
  setUserId,
  registerFlow = false,
}) => {
  const [otp, setOtpValue] = useState("");
  const [btnLoader, setButtonLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });

  const handleOtpInputChange = (otp) => {
    if (isNaN(otp)) return;
    setOtpValue(otp); 
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

  const handleSubmitOTP = () => {
    setButtonLoader(true);
    authAxios
      .post(APIUrl, {
        phone_number: `+${mobileNo}`,
        otp: otp,
      })
      .then((res) => {
        setButtonLoader(false);
        if (!registerFlow) setUserId(res?.data?.data?.user_code);
        if (res?.data?.message) toast.success(res.data.message);
        afterAPISuccess(res?.data?.data);
      })
      .catch((err) => {
        setButtonLoader(false);
        if (err?.response?.status === 400) {
          setShowErrorMsg({ show: true, msg: err.response.data?.message });
          toast.error(err.response.data?.message);
        }
      });
  };

  const handleResetOTP = () => {
    setLoader(true);
    authAxios
      .post(REGISTER.resendOtp, {
        phone_number: `+${mobileNo}`,
      })
      .then((res) => {
        if (res?.data?.message) toast.success(res.data.message);
        setShowErrorMsg({ show: true, msg: res.data?.message });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false); 
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <SelectRoleHeader verifyNumberPage={true} />
      <section class="login-process-sec py-100">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div className="login-process-wrap">
                {loader && <PageLoader />}
                <h3>Verify your number</h3>
                <p>
                  Enter the verification code we sent to your phone number.{" "}
                  <span
                    className="highlightedText"
                    onClick={mobileNumberScreen}
                  >
                    Wrong number?
                  </span>
                </p>

                <div className="form-wrap">
                  <form>
                    <div className="fieldset">
                      <OtpInput
                        value={otp}
                        onChange={handleOtpInputChange}
                        numInputs={6}
                        renderInput={(props) => (
                          <input
                            {...props}
                            placeholder="-"
                            className="otpInput"
                          />
                        )}
                        isInputNum={true}
                        containerStyle="OTPInputContainer"
                      />
                      {showErrorMsg.show && (
                        <ErrorMessage msg={showErrorMsg.msg} />
                      )}
                    </div>
                    <div className="fieldset">
                      <SubmitButton
                        loader={btnLoader}
                        type="button"
                        disabled={
                          otp.length !== 6 || btnLoader || showErrorMsg.show
                        }
                        contentText={"Verify"}
                        onClickCallBack={handleSubmitOTP}
                      />
                      {/* <button
              type="button"
              className={`${
                otp.length !== 4 || btnLoader ? "btn-on-loading" : "btn-design"
              }`}
              disabled={otp.length !== 4 || btnLoader}
              onClick={handleSubmitOTP}
            >
              {btnLoader && <ButtonLoader />}
              Verify
            </button> */}
                    </div>

                    <p>
                      <span
                        className="highlightedText"
                        onClick={handleResetOTP}
                      >
                        Resend code
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyOTP;
