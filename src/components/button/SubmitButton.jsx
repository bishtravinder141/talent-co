import ButtonLoader from "../loader/ButtonLoader";

const SubmitButton = ({
  loader,
  disabled,
  type = "submit",
  contentText,
  onClickCallBack,
}) => {
  return (
    <button
      type={type}
      className={`${loader ? "btn-on-loading" : "btn-design"}`}
      disabled={disabled}
      {...(type !== "submit" && { onClick: onClickCallBack })}
    >
      {loader && <ButtonLoader />}
      {contentText}
    </button>
  );
};

export default SubmitButton;
