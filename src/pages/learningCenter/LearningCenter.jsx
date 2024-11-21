import { Fragment } from "react";
import TopSection from "../../components/home/TopSection";
import CourseCard from "../../components/LearningCenter/courseCard";
import EducationProvider from "../../components/LearningCenter/EducationProvider";
import StudyMode from "../../components/LearningCenter/StudyMode";
import ELearningCard from "../../components/LearningCenter/ELearningCard";
import { Link } from "react-router-dom";
import ConstantTopSection from "../../components/job-seeker/constantTopSection";

const LearningCenter = () => {
  const heading = "Learning Centre";
  const subText =
    "Please find training courses, templates and information to increase your skills and training.";

  const coursesData = [
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Product Management Certification Program",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Business Analytics Certification Program",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "PG Certification in Full Stack Development with Job Guarantee",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Product Management Certification Program",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Advanced Certificate Program in Data Science",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Certificate Course in Finance Accounting and Taxation",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Business Analytics Certification Program",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "Advanced Certificate Program in Data Science",
    },
    {
      imgSrc: "./assets/images/hat-icon.svg",
      link: "/",
      title: "PG Certification in Full Stack Development with Job Guarantee",
    },
  ];

  const educationProvidersData = [
    {
      name: "Australian College of Nursing",
      courses: 20,
      link: "/",
      rating: 4.9,
    },
    {
      name: "Queensland University of Technology",
      courses: 20,
      link: "/",
      rating: 4.9,
    },
    {
      name: "Australian College of Nursing",
      courses: 20,
      link: "/",
      rating: 4.9,
    },
    {
      name: "Queensland University of Technology",
      courses: 20,
      link: "/",
      rating: 4.9,
    },
    {
      name: "Australian College of Nursing",
      courses: 20,
      link: "/",
      rating: 4.9,
    },
    {
      name: "Queensland University of Technology",
      courses: 20,
      link: "/",
      rating: 4.9,
    },
  ];

  const studyModesData = [
    {
      number: "01",
      title: "Synchronous or Live Learning",
      description:
        "Synchronous or live learning refers to a teaching and learning method in which students and instructors participate in real-time interactions. This approach allows learners to engage with course materials, ask questions, receive immediate feedback, and collaborate with peers in a dynamic online environment.",
    },
    {
      number: "02",
      title: "Interactive Learning",
      description:
        "Interactive learning is an educational approach that emphasizes active participation and engagement from learners.",
    },
    {
      number: "03",
      title: "Individual Learning",
      description:
        "Individual learning refers to the process of acquiring knowledge, skills, and understanding on a personal level, often through self-directed study or exploration. It emphasizes the independent pursuit of learning objectives and the development of critical thinking and problem-solving abilities.",
    },
    {
      number: "04",
      title: "Hybrid Learning Mode",
      description:
        "Hybrid learning, also known as blended learning, refers to an educational approach that combines elements of traditional in-person instruction with online learning.",
    },
  ];

  const eLearningData = [
    {
      imgSrc: "assets/images/e-learning1.jpg",
      title: "Nulla mauris nunc,",
      description: "Fusce rhoncus lectus vel lectus sollicitudin lobortis.",
    },
    {
      imgSrc: "assets/images/e-learning2.jpg",
      title: "Curabitur ac dolor ligula",
      description: "Fusce rhoncus lectus vel lectus sollicitudin lobortis.",
    },
    {
      imgSrc: "assets/images/e-learning3.jpg",
      title: "Nulla mauris nunc,",
      description: "Fusce rhoncus lectus vel lectus sollicitudin lobortis.",
    },
    {
      imgSrc: "assets/images/e-learning4.jpg",
      title: "Curabitur ac dolor ligula",
      description: "Fusce rhoncus lectus vel lectus sollicitudin lobortis.",
    },
    {
      imgSrc: "assets/images/e-learning5.jpg",
      title: "Nulla mauris nunc,",
      description: "Fusce rhoncus lectus vel lectus sollicitudin lobortis.",
    },
    {
      imgSrc: "assets/images/e-learning6.jpg",
      title: "Curabitur ac dolor ligula",
      description: "Fusce rhoncus lectus vel lectus sollicitudin lobortis.",
    },
  ];

  return (
    <main>
      <ConstantTopSection
        heading={heading}
        title={subText}
        search={true}
        placeholder={"Search"}
        searchButton={false}
      />

      <section className="Learning-centre py-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Featured Courses</h2>
            </div>
            {coursesData.map((course, index) => (
              <Fragment key={index}>
                <CourseCard
                  link={course.link}
                  title={course.title}
                  imgSrc={course.imgSrc}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="education_providers">
        <div className="container">
          <div className="border-top py-100">
            <div className="row">
              <div className="col-12">
                <h2>Education Providers</h2>
              </div>
              {educationProvidersData.map((provider, index) => (
                <Fragment key={index}>
                  <EducationProvider
                    name={provider.name}
                    link={provider.link}
                    courses={provider.courses}
                    rating={provider.rating}
                  />
                </Fragment>
              ))}
              <div className="col-12 text-center mt-4">
                <Link to="/" className="btn-design">
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="study-mode-sec">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center">
              <div className="col-12">
                <h2>Study Modes</h2>
                {studyModesData.map((mode, index) => (
                  <Fragment key={index}>
                    <StudyMode
                      number={mode.number}
                      title={mode.title}
                      description={mode.description}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="industry-insights-sec">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center">
              <div className="col-12">
                <h2>Industry Insights</h2>
                <img src="./assets/images/graph.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="student-support-sec">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center">
              <div className="col-12">
                <h2>Student Support</h2>
                <p>how we can help?</p>
              </div>

              <div className="col-12">
                <div className="support-col">
                  <div className="support-icon">
                    <img src="./assets/images/faq.svg" />
                  </div>
                  <div className="support-content">
                    <h5>Frequently Asked Questions</h5>
                    <p>
                      Fusce rhoncus lectus vel lectus sollicitudin lobortis.
                      Etiam magna ante, sodales in luctus quis, mattis vitae
                      magna. Maecenas condimentum congue velit sed aliquam.
                    </p>
                  </div>
                </div>
                <div className="support-col">
                  <div className="support-icon">
                    <img src="./assets/images/card.svg" />
                  </div>
                  <div className="support-content">
                    <h5>Billing and Payments</h5>
                    <p>
                      Fusce rhoncus lectus vel lectus sollicitudin lobortis.
                      Etiam magna ante, sodales in luctus quis, mattis vitae
                      magna. Maecenas condimentum congue velit sed aliquam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="e-learning-sec">
        <div className="container">
          <div className="border-top py-100">
            <div className="row align-items-center">
              <div className="col-12">
                <h2>E-Learning</h2>
                <p>
                  Enhancing Education Through Flexible and Engaging Online
                  Learning
                </p>
              </div>
              {eLearningData.map((item, index) => (
                <Fragment key={index}>
                  <ELearningCard
                    imgSrc={item.imgSrc}
                    title={item.title}
                    description={item.description}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LearningCenter;
