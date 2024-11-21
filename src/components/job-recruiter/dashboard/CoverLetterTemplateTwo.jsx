import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ErrorMessage from "../../errorMsg/ErrorMessage";
import { Controller } from "react-hook-form";
const CoverLetterTemplateTwo = ({
  register,
  candidateData,
  offerLetterData,
  setOfferLetterData,
  errors,
  control,
}) => {
  const { company_name } = useSelector(
    (state) => state?.recruiter?.companyProfile
  );
  const [editCoverLetter, setEditCoverLetter] = useState(false);
  return (
    <div>
      <div className="job-seeker-dashboard-sec py-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="shadow-box coverletter-sec">
                <div className="headingContainer">
                  <h4>Offer Letter</h4>
                  <div className="text-end mb-5">
                    <span
                      onClick={() => setEditCoverLetter(!editCoverLetter)}
                      className="d-inline-block edit-link cursor-pointer"
                    >
                      <img
                        src={`../assets/images/${
                          editCoverLetter ? "checked" : "edit-icon"
                        }.svg`}
                      />
                    </span>
                  </div>
                </div>
                <div className="coverletter-cotnent border-top py-4 mt-4">
                  {/* <p>Dear [Contact],</p> */}
                  <p>
                    Dear {candidateData?.candidate_details?.candidate_name} ,
                  </p>
                  <p>
                    We were all very excited to meet and get to know you over
                    the past few days. We have been impressed with your
                    background and would like to formally offer you the position
                    of {candidateData?.job_title}.
                  </p>
                  <p>
                    This is a [{" "}
                    {editCoverLetter ? (
                      <>
                        <Controller
                          name="job_type"
                          rules={{ required: "This field is required" }}
                          control={control}
                          render={({ field }) => <input checked = {offerLetterData?.job_type  === "full"} name="job_type" type="radio" value = "full" onChange={(e)=>{
                            setOfferLetterData({
                              ...offerLetterData,
                              job_type: e.target.value,
                            });
                            field.onChange(e);
                          }} />}
                        />
                        Full
                         <Controller
                          name="job_type"
                          rules={{ required: "This field is required" }}
                          control={control}
                          render={({ field }) => <input checked = {offerLetterData?.job_type  === "part"} name="job_type" type="radio" value = "part" onChange={(e)=>{
                            setOfferLetterData({
                              ...offerLetterData,
                              job_type: e.target.value,
                            });
                            field.onChange(e);
                          }} />}
                          />
                          Part
                      </>
                    ) : (
                      <Controller
                        name="job_type"
                        rules={{ required: "This field is required" }}
                        control={control}
                        render={({ field }) => (
                          <input
                            // onChange={(e) => {
                            //   setOfferLetterData({
                            //     ...offerLetterData,
                            //     job_type: e.target.value,
                            //   });
                            //   field.onChange(e);
                            // }}
                            readOnly={!editCoverLetter}
                            value={offerLetterData.job_type}
                            placeholder="full/part"
                            className={`${
                              editCoverLetter
                                ? "cover-field active-field"
                                : "cover-field"
                            }`}
                          />
                        )}
                      />
                    )}
                    {/* <input
                      {...register("job_type", {
                        required: "Job type field is required",
                      })}
                      onChange={(e) => {
                        setValue("job_type",e.target.value)
                        setOfferLetterData({
                          ...offerLetterData,
                          job_type: e.target.value,
                        });
                      }}
                      readOnly={!editCoverLetter}
                      value={offerLetterData.job_type}
                      placeholder="full/part"
                      className={`${
                        editCoverLetter
                          ? "cover-field active-field"
                          : "cover-field"
                      }`}
                    /> */}
                    ]{" "}
                    {errors?.job_type && (
                      <span>
                        {" "}
                        <ErrorMessage msg={errors?.job_type?.message} />
                      </span>
                    )}
                    time position [
                    <Controller
                      name="working_days"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              working_days: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          placeholder="mention working days and hours"
                          readOnly={!editCoverLetter}
                          value={offerLetterData.working_days}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    {errors?.working_days && (
                      <ErrorMessage msg={errors?.working_days?.message} />
                    )}
                    ] You will be reporting to the head of the [{" "}
                    <Controller
                      name="department_name"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              department_name: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          readOnly={!editCoverLetter}
                          placeholder="Department_name"
                          value={offerLetterData.department_name}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ]{" "}
                    {errors?.department_name && (
                      <ErrorMessage msg={errors?.department_name?.message} />
                    )}{" "}
                    department. [If applicable: Please note that
                    {company_name ? company_name : "company_name"} is an at-will
                    employer. That means that either you or
                    {company_name ? company_name : "company_name"} are free to
                    end the employment relationship at any time, with or without
                    notice or cause.]
                  </p>
                  <p>
                    We will be offering you an annual gross salary of $[
                    <Controller
                      name="salary"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              salary: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          placeholder="X"
                          readOnly={!editCoverLetter}
                          value={offerLetterData.salary}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ]
                    {errors?.salary && (
                      <ErrorMessage msg={errors?.salary?.message} />
                    )}{" "}
                    and [
                    <Controller
                      name="bonus_programs"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              bonus_programs: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          placeholder="mention bonus programs, if applicable"
                          readOnly={!editCoverLetter}
                          value={offerLetterData.bonus_programs}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ] You will also have [
                    <Controller
                      name="company_benefits"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              company_benefits: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          readOnly={!editCoverLetter}
                          value={offerLetterData.company_benefits}
                          placeholder="mention benefits as per company policy, like health and insurance plan, corporate mobile or travel expenses"
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ] and [
                    <input
                      onChange={(e) => {
                        setOfferLetterData({
                          ...offerLetterData,
                          paid_vacation: e.target.value,
                        });
                      }}
                      placeholder="X"
                      readOnly={!editCoverLetter}
                      value={offerLetterData.paid_vacation}
                      className={`${
                        editCoverLetter
                          ? "cover-field active-field"
                          : "cover-field"
                      }`}
                    />
                    ] days of paid vacation per year.
                    {/* [ optional: I am attaching
                    a letter with more details about your compensation plan.
                    {editCoverLetter && (
                      <label>
                        Choose File
                        <input
                          type="file"
                          className="visually-hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setOfferLetterData({
                              ...offerLetterData,
                              file: file,
                            });
                          }}
                        />
                      </label>
                    )}
                    {(offerLetterData?.file?.name) && <span>{offerLetterData?.file?.name}</span>}] */}
                  </p>
                  <p>
                    Your expected starting date is [
                    <Controller
                      name="expected_starting_date"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              expected_starting_date: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          readOnly={!editCoverLetter}
                          value={offerLetterData.expected_starting_date}
                          placeholder="expected starting date"
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    .]
                    {errors?.expected_starting_date && (
                      <ErrorMessage
                        msg={errors?.expected_starting_date?.message}
                      />
                    )}{" "}
                    You will be asked to sign a contract of [{" "}
                    <Controller
                      name="contract_duration"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              contract_duration: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          placeholder="contract_duration, if applicable"
                          readOnly={!editCoverLetter}
                          value={offerLetterData.contract_duration}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ] and [
                    <Controller
                      name="agreements"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              agreements: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          readOnly={!editCoverLetter}
                          value={offerLetterData.agreements}
                          placeholder="mention agreements, like confidentiality, nondisclosure and noncompete"
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ] at the beginning of your employment.
                  </p>
                  <p>
                    We would like to have your response by [
                    {/* {
                      offerLetterData?.expected_starting_date ? (
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          max={
                            offerLetterData?.expected_starting_date &&
                            new Date(offerLetterData?.expected_starting_date)
                              .toISOString()
                              .split("T")[0]
                          }
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              response_date: e.target.value,
                            });
                          }}
                          placeholder="date"
                          readOnly={!editCoverLetter}
                          value={offerLetterData.response_date}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      ) : (
                        "add response date"
                      )
                    } */}
                    <Controller
                      name="response_date"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <input
                          type="date"
                          {...field}
                          min={new Date().toISOString().split("T")[0]}
                          max={
                            offerLetterData?.expected_starting_date &&
                            new Date(offerLetterData?.expected_starting_date)
                              .toISOString()
                              .split("T")[0]
                          }
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              response_date: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          placeholder="date"
                          readOnly={!editCoverLetter}
                          value={offerLetterData.response_date}
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ]{" "}
                    {errors?.response_date && (
                      <ErrorMessage msg={errors?.response_date?.message} />
                    )}{" "}
                    In the meantime, please feel free to contact me or [{" "}
                    <Controller
                      name="manager_name"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              manager_name: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          readOnly={!editCoverLetter}
                          value={offerLetterData.manager_name}
                          placeholder="Manager_name"
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    ] via email or phone on [
                    <Controller
                      name="contact_details"
                      rules={{ required: "This field is required" }}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            setOfferLetterData({
                              ...offerLetterData,
                              contact_details: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          readOnly={!editCoverLetter}
                          value={offerLetterData.contact_details}
                          placeholder="provide contact details"
                          className={`${
                            editCoverLetter
                              ? "cover-field active-field"
                              : "cover-field"
                          }`}
                        />
                      )}
                    />
                    {errors?.contact_details && (
                      <ErrorMessage msg={errors.contact_details.message} />
                    )}
                    ] , should you have any questions.
                  </p>
                  <p>We are all looking forward to having you on our team.</p>
                  <p>
                    <strong>Best regards,</strong>
                  </p>
                  <p>{company_name ? company_name : "company_name"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterTemplateTwo;
