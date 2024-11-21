import React, { useEffect, useState } from "react";
import JobSeekerDashboardLayout from "../../../layouts/job-seeker/JobSeekerDashboardLayout";
import {
  changeResumeTemplate,
  getArticles,
  getMarketplaceTrainingCourses,
  getSelectedResume,
} from "../../../API/resumeTemplate";
import PageLoader from "../../../components/loader/PageLoader";
import { NO_ARTICLES_FOUND, NO_TRAINING_COURSE_FOUND } from "../constant";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import { APPLICATION_BASE_URL } from "../../../config/APIConfig";
import { Link } from "react-router-dom";

const MarketPlace = () => {
  const [selectedResume, setSelectedResume] = useState("cv-template1");
  const resumeTemplates = ["cv-template1", "cv-template2", "cv-template3"];
  const [loader, setLoader] = useState(true);
  const [trainingCourses, setTrainingCourses] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getSelectedResume()
      .then((res) => {
        setLoader(false);
        const tempResume = res.data.data.resume_template;
        if (resumeTemplates.includes(tempResume)) {
          setSelectedResume(tempResume);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
    handleGetTrainingCourses();
    handleGetArticles();
  }, []);

  const selectResume = (id) => {
    const payload = {
      resume_template: id,
    };
    setLoader(true);
    changeResumeTemplate(payload)
      .then((res) => {
        setLoader(false);
        setSelectedResume(id);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, "////");
      });
  };
  const handleGetTrainingCourses = () => {
    setLoader(true);
    getMarketplaceTrainingCourses()
      .then((res) => setTrainingCourses(res?.data?.data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleGetArticles = () => {
    setLoader(true);
    getArticles()
      .then((res) => {
        const onlySix = res?.data?.data.filter((_, idx) => idx < 6);
        setArticles(onlySix);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  return (
    <>
      <JobSeekerDashboardLayout
        header={"MarketPlace"}
        showSearchBar={false}
        subTitle={"Feugiat urna tristique. Sed gravida non mauris at. "}
      >
        <div className="reduce-navbar">
          <div className="marketplace-sec">
            <div className="row align-items-center">
              <div className="col-12">
                <h4>Training Courses</h4>
                <p>
                  Enhancing Education Through Flexible and Engaging Online
                  Learning
                </p>
              </div>
              {loader && <PageLoader />}
              {/* <div className="col-lg-4 col-md-6 col-12">
                <div className="e-learning_col">
                  <div className="e-learning_img ratio ratio-4x3">
                    <img src="../assets/images/e-learning1.jpg" />/{" "}
                  </div>
                  <div className="e-learning_content">
                    <h5>Skills Training</h5>
                    <p>
                      How to add the skills to find the better job see below
                    </p>

                    <div className="border-top pt-3">
                      <p>
                        As per your profile, You are looking for a job as{" "}
                        <strong>Web Developer</strong>
                      </p>
                      <p>
                        You need to add skills like this so that you can find
                        the perfect job, We show some suggestions to you{" "}
                      </p>
                      <p>
                        <strong>Eg:</strong> ASP.NET | JavaScript, jQuery, AJAX
                        | Responsive Design | C# | SEO | Google Analytics | MVC
                        | Microsoft SQL Server Chrome, Firefox, Edge, IE |
                        nopCommerce SW | Microsoft Visual Studi
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-lg-4 col-md-6 col-12">
                <div className="e-learning_col">
                  <div className="e-learning_img ratio ratio-4x3">
                    <img src="../assets/images/e-learning2.jpg" />/{" "}
                  </div>
                  <div className="e-learning_content">
                    <h5>Skills Training</h5>
                    <p>
                      How to add the skills to find the better job see below
                    </p>

                    <div className="border-top pt-3">
                      <p>
                        As per your profile, You are looking for a job as{" "}
                        <strong>Web Developer</strong>
                      </p>
                      <p>
                        You need to add skills like this so that you can find
                        the perfect job, We show some suggestions to you{" "}
                      </p>
                      <p>
                        <strong>Eg:</strong> ASP.NET | JavaScript, jQuery, AJAX
                        | Responsive Design | C# | SEO | Google Analytics | MVC
                        | Microsoft SQL Server Chrome, Firefox, Edge, IE |
                        nopCommerce SW | Microsoft Visual Studi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="e-learning_col">
                  <div className="e-learning_img ratio ratio-4x3">
                    <img src="../assets/images/e-learning3.jpg" />/{" "}
                  </div>
                  <div className="e-learning_content">
                    <h5>Skills Training</h5>
                    <p>
                      How to add the skills to find the better job see below
                    </p>

                    <div className="border-top pt-3">
                      <p>
                        As per your profile, You are looking for a job as{" "}
                        <strong>Web Developer</strong>
                      </p>
                      <p>
                        You need to add skills like this so that you can find
                        the perfect job, We show some suggestions to you{" "}
                      </p>
                      <p>
                        <strong>Eg:</strong> ASP.NET | JavaScript, jQuery, AJAX
                        | Responsive Design | C# | SEO | Google Analytics | MVC
                        | Microsoft SQL Server Chrome, Firefox, Edge, IE |
                        nopCommerce SW | Microsoft Visual Studi
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {trainingCourses?.length ? (
                trainingCourses.map(
                  ({
                    course_name,
                    course_image,
                    course_category,
                    course_description,
                    trainer,
                  }) => (
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="e-learning_col">
                        <div className="e-learning_img ratio ratio-4x3">
                          <img src={`${APPLICATION_BASE_URL}${course_image}`} />
                        </div>
                        <div className="e-learning_content">
                          <h5 className="text-capitalize">{course_name}</h5>
                          <p>{course_description}</p>

                          <div className="border-top pt-3">
                            {/* <p>{course_category}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <NoDataFound msg={NO_TRAINING_COURSE_FOUND} />
              )}
            </div>

            <div className="row">
              <div className="col-12 pt-4">
                {/* <h3>Latest News</h3> */}
                <h3>Articles</h3>
              </div>
              {articles?.length ? (
                articles.map(
                  (curArticle,index) => (
                    <div className="col-md-4 col-12">
                      <div className="blog-advice">
                        <div className="blog-img ratio ratio-4x3">
                          <img
                            src={`${APPLICATION_BASE_URL}${curArticle.article_image}`}
                          />
                        </div>
                        <h5>
                          <Link to="/single-blog" state={curArticle}>{curArticle.description}</Link>
                        </h5>
                      </div>
                    </div>
                  )
                )
              ) : (
                <NoDataFound msg={NO_ARTICLES_FOUND} />
              )}

              {/* <div className="col-md-4 col-12">
                <div className="blog-advice">
                  <div className="blog-img ratio ratio-4x3">
                    <img src="../assets/images/latest-news1.jpg" />/{" "}
                  </div>
                  <h5>
                    <a href="single-blog.html">
                      Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                      ante eu dictum porta.
                    </a>
                  </h5>
                </div>
              </div> */}
              {/* <div className="col-md-4 col-12">
                <div className="blog-advice">
                  <div className="blog-img ratio ratio-4x3">
                    <img src="../assets/images/latest-news2.jpg" />/{" "}
                  </div>
                  <h5>
                    <a href="single-blog.html">
                      Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                      ante eu dictum porta.
                    </a>
                  </h5>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="blog-advice">
                  <div className="blog-img ratio ratio-4x3">
                    <img src="../assets/images/latest-news3.jpg" />/{" "}
                  </div>
                  <h5>
                    <a href="single-blog.html">
                      Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                      ante eu dictum porta.
                    </a>
                  </h5>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="blog-advice">
                  <div className="blog-img ratio ratio-4x3">
                    <img src="../assets/images/latest-news1.jpg" />/{" "}
                  </div>
                  <h5>
                    <a href="single-blog.html">
                      Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                      ante eu dictum porta.
                    </a>
                  </h5>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="blog-advice">
                  <div className="blog-img ratio ratio-4x3">
                    <img src="../assets/images/latest-news2.jpg" />/{" "}
                  </div>
                  <h5>
                    <a href="single-blog.html">
                      Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                      ante eu dictum porta.
                    </a>
                  </h5>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="blog-advice">
                  <div className="blog-img ratio ratio-4x3">
                    <img src="../assets/images/latest-news3.jpg" />/{" "}
                  </div>
                  <h5>
                    <a href="single-blog.html">
                      Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                      ante eu dictum porta.
                    </a>
                  </h5>
                </div>
              </div> */}
              <div className="col-12 pt-3">
                <Link to="/blog" className="btn-design">
                  Browse All
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-12 pt-5">
                <h3>Templates</h3>

                <div className="cv-templates border-top py-4 mt-4">
                  <h6>CV Templates</h6>

                  <div className="cv-templates-slider d-flex g-2">
                    <div className="template-slide-items">
                      <img src="/assets/images/cv1.jpg" />{" "}
                      <div className="hover-over">
                        <span onClick={() => selectResume("cv-template1")}>
                          <img src="../assets/images/edit-icon-white.svg" />
                          <span>Edit</span>
                        </span>
                      </div>
                    </div>
                    <div className="template-slide-items">
                      <img src="/assets/images/cv2.jpg" />{" "}
                      <div className="hover-over">
                        <span onClick={() => selectResume("cv-template2")}>
                          <img src="/assets/images/edit-icon-white.svg" />
                          <span>Edit</span>
                        </span>
                      </div>
                    </div>
                    <div className="template-slide-items">
                      <img src="/assets/images/cv3.jpg" />{" "}
                      <div className="hover-over">
                        <span onClick={() => selectResume("cv-template3")}>
                          <img src="/assets/images/edit-icon-white.svg" />
                          <span>Edit</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </JobSeekerDashboardLayout>
    </>
  );
};

export default MarketPlace;
