import React from "react";
import TopSection from "../../components/home/TopSection";
import JobSlidder from "../../components/job/JobSlidder";
import { Link } from "react-router-dom";

const Job = () => {
  const heading = "You have a job. We have 8m+ job seekers.";
  const subText =
    "8 million startup-ready candidates from around the world, unique details you can't find anywhere else, and all the tools you need to hire - get everything set up in 10 minutes, for free.";

  return (
    <main>
      <TopSection heading={heading} subText={subText} />

      <section className="good-company">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center flex-row-reverse">
              <div className="col-md-5 col-12">
                <div className="hero_content">
                  <h2>You’re in good company</h2>
                  <p>
                    The world’s most successful startups made their first hires
                    on our platform
                  </p>

                  <Link to={"/register"} className="btn-design">
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-md-7 col-12">
                <div className="partners-img">
                  <img src="./assets/images/partner1.png" />
                  <img src="./assets/images/partner2.png" />
                  <img src="./assets/images/partner3.png" />
                  <img src="./assets/images/partner4.png" />
                  <img src="./assets/images/partner5.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="startups">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center flex-row-reverse">
              <div className="col-md-6 col-12">
                <img src="./assets/images/startup.svg" />
              </div>
              <div className="col-md-6 col-12">
                <div className="startups_content">
                  <h2>8 million startup-ready candidates</h2>
                  <ul>
                    <li>
                      <img src="./assets/images/icon1.svg" /> Top tech talent
                    </li>
                    <li>
                      <img src="./assets/images/icon2.svg" /> Worldwide focus
                    </li>
                    <li>
                      <img src="./assets/images/icon3.svg" /> Startup-ready
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="whyUs">
        <div className="container">
          <div className="border-top py-100">
            <div className="row">
              <div className="col-12">
                <h2>Why use TalentCo</h2>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="whyUs_col">
                  <div className="why_icon">
                    <img src="assets/images/why_icon1.svg" />
                  </div>
                  <div className="why_content">
                    <h6>Job search status</h6>
                    <p>
                      we'll tell you if a candidate is ready to interview or
                      open to offers
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="whyUs_col">
                  <div className="why_icon">
                    <img src="assets/images/why_icon2.svg" />
                  </div>
                  <div className="why_content">
                    <h6>Skills & experience</h6>
                    <p>
                      we give candidates the ability to showcase this in unique
                      ways, like detailing their biggest accomplishment
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="whyUs_col">
                  <div className="why_icon">
                    <img src="assets/images/why_icon3.svg" />
                  </div>
                  <div className="why_content">
                    <h6>Timezones</h6>
                    <p>
                      you can filter by timezones and see exactly how many hours
                      ahead or behind a candidate is
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="whyUs_col">
                  <div className="why_icon">
                    <img src="assets/images/why_icon4.svg" />
                  </div>
                  <div className="why_content">
                    <h6>Remote preferences</h6>
                    <p>
                      search by candidates who are open to remote work and see
                      what kind of remote culture they're looking for
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="whyUs_col">
                  <div className="why_icon">
                    <img src="assets/images/why_icon5.svg" />
                  </div>
                  <div className="why_content">
                    <h6>Assessments</h6>
                    <p>
                      see video and engineering assessments to help you evaluate
                      skills further
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JobSlidder />

      <section className="joinTeam py-100 text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="joinTeam_content">
                <h2>Join the 100K+ startups building their teams with us</h2>
                <Link to={"/register"} className="btn-design">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Job;
