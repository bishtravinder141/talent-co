import { useForm } from "react-hook-form";
import NameInputText from "../inputFields/InputFieldText";
import { EMAIL_REGEX } from "../../config/regexForValidation";
import ErrorMessage from "../errorMsg/ErrorMessage";
import { authAxios } from "../../config/APIConfig";
import { CONTACT_US } from "../../config/APIUrls";
import { toast } from "react-toastify";
import SubmitButton from "../button/SubmitButton";
import { useState } from "react";

const ContactUsForm = () => {
  const [buttonLoader, setButtonLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setButtonLoader(true);
    const payload = {
      full_name: data.first_name + data.last_name,
      email: data.email,
      message: data.message,
    };
    authAxios
      .post(CONTACT_US, payload)
      .then((res) => {
        setButtonLoader(false);
        if (res.status === 200) {
          toast.success(res.data?.message);
          reset();
        }
      })
      .catch((err) => {
        setButtonLoader(false);
        toast.error("something went wrong");
      });
  };

  return (
    <div className="contact_form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <NameInputText
          error={errors?.first_name?.message}
          placeholder={"First Name"}
          icon={"../assets/images/user.svg"}
          validation={register("first_name", {
            required: "First Name is required.",
          })}
        />
        <NameInputText
          error={errors?.last_name?.message}
          placeholder={"Last Name"}
          icon={"../assets/images/user.svg"}
          validation={register("last_name", {
            required: "Last Name is required.",
          })}
        />
        <NameInputText
          error={errors?.email?.message}
          placeholder={"Your Email"}
          icon={"../assets/images/email.svg"}
          validation={register("email", {
            required: "Email is required.",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email",
            },
          })}
        />
        <NameInputText
          error={errors?.subject?.message}
          placeholder={"Subject"}
          icon={"../assets/images/subject_icon.svg"}
          validation={register("subject", {
            required: "Subject is required.",
          })}
        />
        <div className="fieldset">
          <textarea
            placeholder="Write your message.."
            name="message"
            className="form-control input-icon message-field"
            {...register("message", {
              required: "Message is required.",
            })}
          ></textarea>
          <span className="input-field-icon">
            <img src="../assets/images/message-icon.svg" />
          </span>
          {errors?.message && <ErrorMessage msg={errors?.message?.message} />}
        </div>
        <div className="fieldset">
          <SubmitButton
            loader={buttonLoader}
            contentText={"Send Message"}
            disabled={buttonLoader}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
