import ConstantTopSection from "../../components/job-seeker/constantTopSection";
import TestimonialSlider from "../../components/slider";
import FAQAccordion from "../../components/faq/FAQAccordion";
import { Link } from "react-router-dom";
import { FormFooter } from "../../components/pricing/FormFooter";
import { getAllPlansApi } from "../../API/recruitersApi";
import { useEffect, useState } from "react";
import PricingCards from "../../components/pricing/PricingCards";

const Pricing = () => {

  const [avaliablePlans, setAvaliablePlans] = useState();
  
  useEffect(() => {
    getAllPlansApi()
      .then((data) => {
        setAvaliablePlans(data?.data?.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("getMasterJobData", error.message);
      })
      .finally(() => {
        // setLoader(false);
      });
  }, []);


  return (
    <main>
      <ConstantTopSection
        heading="Pricing"
        title={"Lorem ipsum dolor sit amet, consectetur"}
      />

      <section className="pricing-sec  py-100">
        <div className="container">
          <div className="row align-items-center  flex-row-reverse">
            <div className="col-md-6 col-12">
              <img src="assets/images/pricing-graphic.svg" />
            </div>
            <div className="col-md-6 col-12">
              <div className="startups_content">
                <h2>From pre-seed to post-IPO</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum.
                </p>
              </div>
            </div>
            <PricingCards avaliablePlans={avaliablePlans} />
          </div>
        </div>
      </section>

      <section className="testimonials_sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>What users are saying</h2>
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      <section className="faqs_sec py-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>For Employers</h2>
              <div className="faq-col">
                <FAQAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-footer-section">
        <PricingFooter />
      </section>
    </main>
  );
};

export default Pricing;

export const PricingFooter = () => {
  return (
    <footer className="site_footer">
      <section className="subscribe_sec">
        <div className="container">
          <div className="border-top py-100">
            <div className="row justify-content-between">
              <div className="col-md-6 col-12">
                <img src="assets/images/subscribe.svg" />
                <h2>Subscribe Today</h2>
                <p>Register your details to receive news and updates.</p>
              </div>
              <div className="col-lg-5 col-md-6 col-12">
                <div className="subscribe_form">
                  <FormFooter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_bottom">
        <div className="container">
          <div className="border-top py-100">
            <div className="row">
              <div className="col-lg-3 col-12">
                <div className="footer_logo">
                  <a href="index.html">
                    <img src="assets/images/logo.svg" />
                  </a>
                </div>
                <p>
                  Transforming business for a better tomorrow, one job at a
                  time.
                </p>
                <div className="followUs">
                  <h6>Follow Us :</h6>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-square-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-x-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <h6>For Job Seekers</h6>
                <ul>
                  <li>
                    <a href="categories.html">Job Categories</a>
                  </li>
                  <li>
                    <a href="job.html">Browse Jobs</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Browse Companies</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Career Advice</a>
                  </li>
                  <li>
                    <a href="job.html">Remote Jobs</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <h6>For Recruiters</h6>
                <ul>
                  <li>
                    <a href="javascript:void(0)">Browse Candidates</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Recruiter Tools</a>
                  </li>
                  <li>
                    <a href="pricing.html">Pricing</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <h6>Company</h6>
                <ul>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Training Centre</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Help</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Partner with us</a>
                  </li>
                  <li>
                    <a href="terms-conditions.html">Terms &amp; Risks</a>
                  </li>
                  <li>
                    <a href="policies.html">Our policies</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Careers at TalentCo</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
