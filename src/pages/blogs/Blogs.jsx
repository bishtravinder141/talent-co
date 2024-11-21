import React from "react";
import ConstantTopSection from "../../components/job-seeker/constantTopSection";
import CareerAdvice from "../../components/blogs/CareerAdvice";
import LatestNews from "../../components/blogs/LatestNews";
import LatestArticles from "../../components/blogs/LatestArticles";
import LatestPressReleases from "../../components/blogs/LatestPressReleases";
import NewsAndPressReleases from "../../components/blogs/NewsAndPressReleases";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <main>
      <ConstantTopSection heading="News & Articles" />
      <section className="news-articles-sec py-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>News, Articles & Advice</h3>
              <h6>Navigating Your Professional Path to Success</h6>
            </div>

            <div className="col-12">
              <div className="blog-top-bar">
                <div className="news-types">
                  <ul>
                    <li>Career Advice</li>
                    <li>Articles</li>
                    <li>Press Releases</li>
                    <li>Career Advice</li>
                  </ul>
                </div>
                <div className="followUs">
                  <h6>Follow Us :</h6>
                  <ul>
                    <li>
                      <Link to={"/"}>
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <i className="fa-brands fa-square-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <i className="fa-brands fa-x-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9 col-12">
              <div className="featured-blog">
                <div className="featured-blog-img ratio ratio-4x3">
                  <img src="assets/images/blog1.jpg" />
                </div>
                <div className="blog-content">
                  <h4>
                    <Link href={"/single-blog"}>
                      Your guide to salaries, minimum wage and negotiating pay
                      rises
                    </Link>
                  </h4>
                  <ul>
                    <li>Research Salaries</li>
                    <li>Know the Minimum Wage</li>
                    <li>Prepare for Negotiations</li>
                    <li>Assess Your Value</li>
                    <li>Timing and Approach</li>
                    <li>Consider Non-Monetary Perks</li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12 pt-5">
                  <h3>Featured Career Advice</h3>
                </div>
                <CareerAdvice />
              </div>
              <div className="row">
                <div className="col-12 pt-5">
                  <h3>Latest News</h3>
                </div>
                <LatestNews />
              </div>
              <div className="row">
                <div className="col-12 pt-5">
                  <h3>Latest Articles</h3>
                </div>
                <LatestArticles />
              </div>
              <div className="row">
                <div className="col-12 pt-5">
                  <h3>News & Press Releases</h3>
                </div>
                <NewsAndPressReleases />
                <div className="col-12 text-center my-3">
                  <Link href={"/"} className="btn-design">
                    Load More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="sidebar">
                <div className="sidebar-ads">
                  <Link href={"/"}>
                    <img src="assets/images/ads1.jpg" />
                  </Link>
                </div>
                <div className="sidebar-ads">
                  <Link href={"/"}>
                    <img src="assets/images/ads2.jpg" />
                  </Link>
                </div>
                <div className="blog-advice">
                  <h5>
                    <Link href={"/"}>Sed nec feugiat odio</Link>
                  </h5>
                  <div className="blog-img ratio ratio-4x3">
                    <img src="assets/images/news1.jpg" />
                  </div>
                  <h5>
                    <Link href={"/"}>
                      Nunc quis accumsan libero, ut condimentum ante. Integer
                      lectus arcu,
                    </Link>
                  </h5>
                </div>
                <div className="blog-advice">
                  <h5>
                    <Link href={"/"}>Etiam magna lectus</Link>
                  </h5>
                  <div className="blog-img ratio ratio-4x3">
                    <img src="assets/images/news3.jpg" />
                  </div>
                  <h5>
                    <Link href={"/"}>
                      Aliquam scelerisque dapibus massa, et iaculis nulla
                      elementum eu.
                    </Link>
                  </h5>
                </div>
                <div className="blog-advice">
                  <h5>
                    <Link href={"/"}>Sed nec feugiat odio</Link>
                  </h5>
                  <div className="blog-img ratio ratio-4x3">
                    <img src="assets/images/news4.jpg" />
                  </div>
                  <h5>
                    <Link href={"/"}>
                      Nunc quis accumsan libero, ut condimentum ante. Integer
                      lectus arcu,
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blogs;
