import clickIcon from "../../assets/images/click_icon.svg";
import missionIcon from "../../assets/images/mission_icon.svg";
import changesIcon from "../../assets/images/changes_icon.svg";
import sendOfferIcon from "../../assets/images/send-offer.svg";
import candidateGraphicIcon from "../../assets/images/candidate-graphic.svg";
import employersIcon1 from "../../assets/images/employers_icon1.svg";
import employersIcon2 from "../../assets/images/employers_icon2.svg";
import employersIcon3 from "../../assets/images/employers_icon3.svg";
import employersIcon4 from "../../assets/images/employers_icon4.svg";
import employersGraphic from "../../assets/images/employers-graphic.svg";
import phoneImg from "../../assets/images/phone_img.png";
import appleImg from "../../assets/images/apple-store.png";
import playStoreIcon from "../../assets/images/play-store.png";
import TestimonialSlider from "../../components/slider";
import TopSection from "../../components/home/TopSection";
import CategoryCard from "../../components/home/categoryCard";
import { Fragment } from "react";
import WhyUsCard from "../../components/home/whyUsCard";
import ArticalsCard from "../../components/home/ArticalsCard";

const Home = () => {
  const heading = "Find your ESG, Climate or Sustainability dream job today";
  const subText =
    "We connect passionate people with purposeful work. Our dedicated ESG, Climate & sustainability jobs platform connects talent with mission driven companies.";
  const whyUsData = [
    {
      link: "/",
      title: "Specialized Focus",
      description:
        "TalentCo is a dedicated global platform specifically designed for jobs related to ESG, Sustainability, climate, nature, environment, and sustainable finance sectors. It offers a targeted approach, ensuring that users find relevant job opportunities in these critical and growing areas.",
    },
    {
      link: "/",
      title: "Access to Global Jobs Market",
      description:
        "TalentCo allows users to tap into this growing field and explore a wide range of job openings, from renewable energy to sustainable finance and beyond. Users can access a comprehensive range of job opportunities, from entry-level to executive positions, across sustainability, ESG, climate, and nature. Our platform also connects with other global jobs platforms to ensure we collate specific job listings.",
    },
    {
      link: "/",
      title: "Educational Resources",
      description:
        "TalentCo offers educational resources such as webinars, workshops, specific training with vetted training partners, and articles focused on ESG, climate, and related industries. This helps users stay updated with the latest trends, best practices, and advancements in these fields, enhancing their skills and knowledge.",
    },
    {
      link: "/",
      title: "Customized Job Alerts & Matches",
      description:
        "Users can set up personalized job alerts based on their preferences, ensuring they receive notifications about relevant job openings. This feature streamlines the job search process and keeps users informed about the latest opportunities in their desired field. TalentCo employs advanced algorithms and data analytics to match users with job opportunities that align with their skills, experience, and career goals. This ensures a higher likelihood of finding the right job fit.",
    },
    {
      link: "/",
      title: "Smart Job Applications",
      description:
        "TalentCo offers resources, integrated application tools, and tips to improve users' job applications and increase their chances of securing the desired positions. This support includes resume writing guidance, interview tips, and insights into what employers in the ESG and climate sectors look for in candidates.",
    },
    {
      link: "/",
      title: "Networking and Community Building",
      description:
        "TalentCo fosters a community of like-minded professionals, creating opportunities for networking, collaboration, and knowledge sharing. Users can connect with professionals in the ESG and climate sectors, enhancing their career growth and learning experiences.",
    },
  ];

  const articalsData = [
    {
      title: "Lorem ipsum dolor sit consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
  ];
  return (
    <>
      <main>
        <TopSection heading={heading} subText={subText} />

        <section className="startups candidates">
          <div className="container">
            <div className="border-top py-100">
              <div className="row align-items-center">
                <div className="col-md-6 col-12">
                  <img src={candidateGraphicIcon} />
                </div>
                <div className="col-md-6 col-12">
                  <div className="startups_content candidates-col">
                    <h2>For Candidates</h2>
                    <ul>
                      <li>
                        <img src={clickIcon} /> One click applications after you upload your details
                      </li>
                      <li>
                        <img src={missionIcon} /> Get matched to organizations
                        based on your profile and skills{" "}
                      </li>
                      <li>
                        <img src={changesIcon} /> Streamlined application
                        process, track progress, and responses on the
                        platform
                      </li>
                      <li>
                        <img src={sendOfferIcon} /> Send and receive offers
                      </li>
                    </ul>
                    <a href="#" className="btn-design">
                      Upload Your CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="startups recruiters">
          <div className="container">
            <div className="border-top py-100">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-md-6 col-12">
                  <img src={employersGraphic} />
                </div>
                <div className="col-md-6 col-12">
                  <div className="startups_content">
                    <h2>For Recruiters</h2>
                    <ul>
                      <li>
                        <img src={employersIcon1} /> Only get connected to
                        candidates that meet your selection criteria
                      </li>
                      <li>
                        <img src={employersIcon2} /> Streamline applicant
                        screening so you spend less time per applicant
                      </li>
                      <li>
                        <img src={employersIcon3} /> Simplified application
                        tracking and shortlisting system
                      </li>
                      <li>
                        <img src={employersIcon4} /> Dedicated global platform
                        to find ESG, climate 'Nature, energy and environment
                        professionals
                      </li>
                    </ul>

                    <a href="dashboard.html" className="btn-design">
                      Post a Job
                    </a>
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
                {whyUsData.map((item, index) => (
                  <Fragment key={index}>
                    <WhyUsCard
                      imgSrc={`./assets/images/why${index + 1}.svg`}
                      title={item.title}
                      description={item.description}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CategoryCard />

        <section className="getConnected_sec">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="getConnected_col">
                  <div className="app-phone">
                    <img src={phoneImg} />
                  </div>
                  <div className="app-content">
                    <h2>Get Connected</h2>
                    <p>
                      Transform your career. Search and apply for your dream
                      job.
                    </p>
                    <div className="appdownload">
                      <a href="#">
                        <img src={appleImg} />
                      </a>
                      <a href="#">
                        <img src={playStoreIcon} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials_sec py-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>What users are saying</h2>
                <TestimonialSlider />
              </div>
            </div>
          </div>
        </section>

        <section className="news_sec py-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8 col-12">
                <h2>News & Articles</h2>
              </div>
              <div className="col-md-4 col-12 text-end">
                <a href="blog.html" className="btn-design">
                  More Posts
                </a>
              </div>
            </div>

            <div className="row">
              {articalsData.map((item, index) => (
                <Fragment key={index}>
                  <ArticalsCard
                    title={item.title}
                    description={item.description}
                    link={item.link}
                    imgSrc={`./assets/images/news${index + 1}.jpg`}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
