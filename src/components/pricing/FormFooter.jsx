import { useState } from "react";

export const FormFooter = () => {
    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(values);
    };
    
    return (
      <form>
        <div className="fieldset">
        <input
            type="text"
            placeholder="First name"
            className="form-control input-icon name-field"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            required
          />
          <span className="input-field-icon">
            <img src="assets/images/user.svg" />
          </span>
        </div>
        <div className="fieldset">
        <input
            type="text"
            placeholder="Last name"
            className="form-control input-icon name-field"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            required
          />
          <span className="input-field-icon">
            <img src="assets/images/user.svg" />
          </span>
        </div>
        <div className="fieldset">
        <input
            type="text"
            placeholder="Company"
            className="form-control input-icon company-field"
            name="company"
            value={values.company}
            onChange={handleChange}
            required
          />
          <span className="input-field-icon">
            <img src="assets/images/company.svg" />
          </span>
        </div>
        <div className="fieldset">
          <input
            type="text"
            placeholder="Your email"
            className="form-control input-icon email-field"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <span className="input-field-icon">
            <img src="assets/images/email.svg" />
          </span>
        </div>
        <div className="fieldset">
          <p>
            With our <a href="terms-conditions.html">Terms and Conditions</a> and{" "}
            <a href="policies.html">Privacy Policy</a>
          </p>
        </div>
        <div className="fieldset">
          <input type="button" onClick={handleSubmit} defaultValue="Sign Up" className="btn-design" />
        </div>
      </form>
    );
  };