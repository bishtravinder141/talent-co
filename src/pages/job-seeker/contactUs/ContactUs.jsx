import ContactUsForm from "../../../components/forms/ContactUsForm";
import ConstantTopSection from "../../../components/job-seeker/constantTopSection";

const ContactUs = () => {
  return (
    <main>
      <ConstantTopSection heading="Looking for Product Support?" title="Please visit our services center" supportButton={true}/>
      <section className="contactUs_sec py-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contactInfo-col">
                <div className="row">
                  <div className="col-md-4 col-12">
                    <div className="contact-info">
                      <h4>General Enquiries</h4>
                        <div className="querySubmission">
                          <p>Submit a Request if you are looking for:</p>
                          <ul>
                            <li>Marketing</li>
                            <li>Partnerships</li>
                            <li>General Enquiries</li>
                            <li>Sales</li>
                            <li>Media</li>
                          </ul>
                        </div>

                      <div className="phone_icon contact-icon">
                        <i className="fa-solid fa-mobile-screen-button"></i>{" "}
                        202-555-0146
                      </div>
                      <div className="phone_icon contact-icon">
                        <i className="fa-solid fa-envelope"></i>{" "}
                        talentco@gmail.com
                      </div>
                      <div className="phone_icon contact-icon">
                        <i className="fa-solid fa-location-dot"></i> 102 street
                        2715 Don
                      </div>
                      <div className="followUs">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fa-brands fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa-brands fa-square-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa-brands fa-x-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa-brands fa-linkedin"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 col-12">
                    <ContactUsForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
