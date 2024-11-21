import UpdatedDropDown from "../../inputFields/UpdatedDropDown";

const BasicInformation = ({
  handleChangeByName,
  newJobPost,
  validator,
  optionField,
}) => {
  return (
    <>
      <div className="col-md-6 col-12">
        <div className="fieldset">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="form-control input-icon user-field"
            onChange={handleChangeByName}
            value={newJobPost.title}
            aria-label="title"
          />
          <span className="input-field-icon">
            <img src="/assets/images/tag-icon.svg" />
          </span>
          {validator.message("title", newJobPost.title, "required", {
            className: "text-danger",
          })}
        </div>
      </div>

      <div className="col-md-6 col-12">
        <UpdatedDropDown
          handleOnChange={handleChangeByName}
          placeholderText={"Type of Job"}
          icon={"/assets/images/yearExp-icon.svg"}
          option={optionField.job_type}
          selectedValue={newJobPost.job_type}
          type="job_type"
        />
        {validator.message("job_type", newJobPost.job_type, "required", {
          className: "text-danger",
        })}
      </div>

      <div className="col-md-6 col-12">
        <UpdatedDropDown
          handleOnChange={handleChangeByName}
          placeholderText={"Primary role"}
          icon={"/assets/images/role-icon2.svg"}
          option={optionField.job_role}
          selectedValue={newJobPost.job_role}
          type="job_role"
        />
        {validator.message("job_role", newJobPost.job_role, "required", {
          className: "text-danger",
        })}
      </div>

      <div className="col-md-6 col-12">
        <UpdatedDropDown
          handleOnChange={handleChangeByName}
          placeholderText={"Work Experience"}
          icon={"/assets/images/experience-icon.svg"}
          option={optionField.work_experience}
          selectedValue={newJobPost.experience}
          type="experience"
        />
        {validator.message("experience", newJobPost.experience, "required", {
          className: "text-danger",
        })}
      </div>

      <div className="col-md-6 col-12">
        <div className="fieldset">
          <textarea
            name="about_company"
            placeholder="About the Company"
            className="form-control input-icon message-field"
            value={newJobPost?.about_company}
            onChange={handleChangeByName}
            aria-label="about_company"
          />
          <span className="input-field-icon">
            <img src="/assets/images/message-icon.svg" />
          </span>
        </div>
        {validator.message(
          "about_company",
          newJobPost.about_company,
          "required",
          { className: "text-danger" }
        )}
      </div>

      <div className="col-md-6 col-12">
        <div className="fieldset">
          <textarea
            name="role_details"
            placeholder="The Role and Key Attributes and Skills Required"
            className="form-control input-icon message-field"
            // defaultValue={""}
            value={newJobPost?.role_details}
            onChange={handleChangeByName}
            aria-label="role_details"
          />
          <span className="input-field-icon">
            <img src="/assets/images/message-icon.svg" />
          </span>
        </div>
        {validator.message(
          "role_details",
          newJobPost.role_details,
          "required",
          { className: "text-danger" }
        )}
      </div>

      <div className="col-md-6 col-12">
        <div className="fieldset">
          <textarea
            name="culture"
            placeholder="Company Culture"
            className="form-control input-icon message-field"
            value={newJobPost?.culture}
            onChange={handleChangeByName}
            aria-label="culture"
          />
          <span className="input-field-icon">
            <img src="/assets/images/message-icon.svg" />
          </span>
          {validator.message("culture", newJobPost.culture, "required", {
            className: "text-danger",
          })}
        </div>
      </div>
    </>
  );
};

export default BasicInformation;
