import ConstantTopSection from "../../components/job-seeker/constantTopSection";

const AboutUs = () => {
  return (
    <main>
      <ConstantTopSection heading="About Us" />

      <section className="startups  py-100">
        <div className="container">
          <div className="row align-items-center  flex-row-reverse">
            <div className="col-md-6 col-12">
              <img src="assets/images/about-graphic.svg" />
            </div>
            <div className="col-md-6 col-12">
              <div className="startups_content">
                <h2>Our mission is simple.</h2>
                <p>
                  To accelerate the transition to a more just and sustainable
                  world. We do this by creating and connecting a community and
                  network of climate, ESG, energy and sustainability
                  professionals and employers who can drive innovation,
                  influence policy, and inspire others to take action.{" "}
                </p>
                <p>
                  Our platform serves as a hub where sustainability and ESG
                  professionals can showcase their expertise, skills, and
                  passion for creating a more sustainable future. Whether you
                  are an experienced sustainability leader, a dedicated ESG
                  analyst, or a recent graduate looking to kickstart your career
                  in this exciting field, we provide a space for you to connect
                  with employers who share your vision and values.
                </p>
                <p>
                  At Talent Co we understand the critical role that
                  sustainability and ESG play in shaping a better world and we
                  are committed to empowering organizations to make a meaningful
                  impact through their hiring decisions. Through our platform,
                  we seek to accelerate the growth of the sustainable economy
                  and contribute to the creation of a more just, equitable, and
                  resilient world for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="startups">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center">
              <div className="col-md-6 col-12">
                <img src="assets/images/mission-graphic.svg" />
              </div>
              <div className="col-md-6 col-12">
                <div className="startups_content">
                  <h2>Our Values</h2>
                  <p>
                    <strong>1. Impact-driven:</strong> We are driven by a strong
                    desire to make a meaningful impact on society and the
                    environment. The platform prioritizes job opportunities that
                    contribute to positive social and environmental outcomes,
                    emphasizing roles that align with ESG principles and
                    sustainability goals.
                  </p>
                  <p>
                    <strong>2. Inclusivity:</strong> We are committed to
                    fostering an inclusive and diverse community. The platform
                    actively promotes equal opportunities regardless of their
                    background, ethnicity, gender, or other characteristics.{" "}
                  </p>
                  <p>
                    <strong>3. Integrity:</strong> We prioritize transparency,
                    honesty, and accountability in our interactions with all our
                    stakeholders. We aim to build trust by acting in the best
                    interests of all parties involved.
                  </p>
                  <p>
                    <strong>4. Collaboration:</strong> We believe in the power
                    of collaboration and the collective impact it can have. We
                    encourages collaboration amount all stakeholders to o
                    exchange knowledge, share best practices, and foster
                    innovation. We aim to be a hub where ideas and solutions
                    flourish through cooperation.
                  </p>
                  <p>
                    <strong>5. Resilience:</strong> we recognizes the importance
                    of resilience in pursuing long-term impact. It embraces
                    flexibility, adaptability, and the ability to navigate
                    challenges and setbacks, while remaining steadfast in its
                    commitment to its mission and vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="startups">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center">
              <div className="col-md-6 col-12">
                <div className="startups_content">
                  <h2>2030 Goals</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </p>
                  <p>
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Curabitur tempus urna at
                    turpis condimentum lobortis. Ut commodo efficitur neque.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="our-goal row align-items-center">
                  <div className="col-md-6 col-6">
                    <div className="categories_col">
                      <div className="categories_icon">
                        <img src="assets/images/country_icon.svg" />
                      </div>
                      <h5>30</h5>
                      <p>Countries</p>
                    </div>

                    <div className="categories_col">
                      <div className="categories_icon">
                        <img src="assets/images/company.svg" />
                      </div>
                      <h5>1K+</h5>
                      <p>Companies</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-6">
                    <div className="categories_col">
                      <div className="categories_icon">
                        <img src="assets/images/client_icon.svg" />
                      </div>
                      <h5>3K+</h5>
                      <p>Satisfied Clients</p>
                    </div>
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

export default AboutUs;
