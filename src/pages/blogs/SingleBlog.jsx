import React, { Fragment } from "react";
import BlogCard from "../../components/blogs/BlogCard";
import { useLocation } from "react-router-dom";

const SingleBlog = () => {
  const relatedPosts = [
    {
      imgSrc: "./assets/images/advice4.jpg",
      title:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui",
      link: "/",
    },
    {
      imgSrc: "./assets/images/advice5.jpg",
      title:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui",
      link: "/",
    },
    {
      imgSrc: "./assets/images/advice6.jpg",
      title:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui",
      link: "/",
    },
  ];

  return (
    <main>
      <div
        className="single-featured-img"
        style={{ backgroundImage: "url(./assets/images/single-blog.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-title">
                <h3>
                  Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                  ante eu dictum porta.
                </h3>
                <div className="publish-date">
                  <p>Published: June 20, 2023 9.01pm BST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="single-news py-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12 d-flex">
              <div className="post-social-history">
                <div className="social-col">
                  <i className="fa-solid fa-chart-simple"></i>  
                  <p>views 1.6K</p>
                </div>
                <div className="social-col">
                  <i className="fa-solid fa-share-nodes"></i>
                  <p>shares 996K</p>
                </div>
                <div className="social-col">
                  <i className="fa-brands fa-instagram"></i>
                  <p>123</p>
                </div>
                <div className="social-col">
                  <i className="fa-brands fa-square-facebook"></i>
                  <p>153</p>
                </div>
                <div className="social-col">
                  <i className="fa-brands fa-square-x-twitter"></i>
                  <p>253</p>
                </div>
                <div className="social-col">
                  <i className="fa-brands fa-linkedin"></i>
                  <p>213</p>
                </div>
              </div>

              <div className="single-news-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac accumsan ex, non luctus eros. Phasellus hendrerit erat
                  lacus, sed gravida quam efficitur nec. Aliquam sit amet est id
                  enim ultricies commodo et at tortor. Nam nec eros ac odio
                  laoreet ullamcorper. Praesent sollicitudin ornare arcu, eu
                  sodales nibh efficitur et. Donec vel est vitae nulla porta
                  dignissim. Cras rutrum leo vitae massa mattis, eu hendrerit mi
                  dignissim. Sed hendrerit nisi in erat vehicula mollis. Nullam
                  sit amet quam sed ipsum laoreet venenatis. Ut vel ipsum sit
                  amet odio vulputate convallis. Praesent aliquet sodales dolor
                  dapibus laoreet. Ut facilisis orci sagittis elit ultricies,
                  nec ultricies risus congue. Sed nunc tortor, pulvinar at
                  semper congue, aliquam efficitur sem. Duis vestibulum, est at
                  aliquet auctor, lacus purus lacinia libero, et suscipit diam
                  dolor quis massa.{" "}
                </p>
                <p>
                  Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                  ante eu dictum porta. Sed ultrices, sapien vitae sollicitudin
                  scelerisque, elit libero malesuada nibh, in posuere leo enim
                  vitae lectus. Cras gravida sapien rhoncus, luctus tellus sit
                  amet, imperdiet ante. Morbi mollis risus sed justo pretium
                  mattis. Cras non eros id tortor aliquam porttitor ut sed sem.
                  Donec vulputate augue nunc, quis suscipit quam placerat et. In
                  sit amet consequat nulla, posuere tristique purus. Aliquam
                  ultrices nunc{" "}
                </p>
                <h5>Vestibulum elementum</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac accumsan ex, non luctus eros. Phasellus hendrerit erat
                  lacus, sed gravida quam efficitur nec. Aliquam sit amet est id
                  enim ultricies commodo et at tortor. Nam nec eros ac odio
                  laoreet ullamcorper. Praesent sollicitudin ornare arcu, eu
                  sodales nibh efficitur et. Donec vel est vitae nulla porta
                  dignissim. Cras rutrum leo vitae massa mattis, eu hendrerit mi
                  dignissim. Sed hendrerit nisi in erat vehicula mollis. Nullam
                  sit amet quam sed ipsum laoreet venenatis. Ut vel ipsum sit
                  amet odio vulputate convallis. Praesent aliquet sodales dolor
                  dapibus laoreet. Ut facilisis orci sagittis elit ultricies,
                  nec ultricies risus congue. Sed nunc tortor, pulvinar at
                  semper congue, aliquam efficitur sem. Duis vestibulum, est at
                  aliquet auctor, lacus purus lacinia libero, et suscipit diam
                  dolor{" "}
                </p>
                <blockquote>
                  Knicker lining concealed back zip fasten swing style high
                  waisted double layer full pattern floral.
                </blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac accumsan ex, non luctus eros. Phasellus hendrerit erat
                  lacus, sed gravida quam efficitur nec. Aliquam sit amet est id
                  enim ultricies commodo et at tortor. Nam nec eros ac odio
                  laoreet ullamcorper. Praesent sollicitudin ornare arcu, eu
                  sodales nibh efficitur et. Donec vel est vitae nulla porta
                  dignissim. Cras rutrum leo vitae massa mattis, eu hendrerit mi
                  dignissim. Sed hendrerit nisi in erat vehicula mollis. Nullam
                  sit amet quam sed ipsum laoreet venenatis. Ut vel ipsum sit
                  amet odio vulputate convallis. Praesent aliquet sodales dolor
                  dapibus laoreet. Ut facilisis orci sagittis elit ultricies,
                  nec ultricies risus congue. Sed nunc tortor, pulvinar at
                  semper congue, aliquam efficitur sem. Duis vestibulum, est at
                  aliquet auctor, lacus purus lacinia libero, et suscipit diam
                  dolor{" "}
                </p>
                <img src="assets/images/blog-inner1.jpg" />
                <p>
                  Curabitur lacinia hendrerit quam nec dictum. Morbi commodo
                  ante eu dictum porta. Sed ultrices, sapien vitae sollicitudin
                  scelerisque, elit libero malesuada nibh, in posuere leo enim
                  vitae lectus. Cras gravida sapien rhoncus, luctus tellus sit
                  amet, imperdiet ante. Morbi mollis risus sed justo pretium
                  mattis. Cras non eros id tortor aliquam porttitor ut sed sem.
                  Donec vulputate augue nunc, quis suscipit quam placerat et. In
                  sit amet consequat nulla, posuere tristique purus. Aliquam
                  ultrices nunc eu dolor posuere posuere. Vestibulum tortor
                  diam, tempor eget cursus sit amet, ultricies{" "}
                </p>
                <p>
                  Nulla vulputate sodales elementum. Vestibulum vulputate
                  elementum posuere. In dignissim, magna vel mattis lacinia,
                  augue urna facilisis odio, in molestie sem massa non arcu.
                  Donec vel augue ipsum. Duis fermentum condimentum ex, quis
                  ornare urna laoreet quis. Aliquam vitae nisl eget velit
                  finibus malesuada. Fusce rhoncus enim eros, sed aliquam orci
                  mattis sit amet. In hac habitasse platea dictumst. Aliquam
                  nisi dui, vulputate quis libero et, auctor blandit dui. Nulla
                  et dolor et ipsum dapibus euismod. Praesent dictum pulvinar
                  tellus, et faucibus erat scelerisque non. Interdum et
                  malesuada fames ac ante ipsum primis in faucibus. Morbi
                  vestibulum congue enim, ac rutrum nisi dictum ac. In hac
                  habitasse platea dictumst.
                </p>

                <div className="related-post">
                  <div className="row">
                    <div className="col-12 pt-4">
                      <h4>You May Also Like</h4>
                    </div>

                    {relatedPosts.map((item, index) => (
                      <Fragment key={index}>
                        <BlogCard
                          imgURL={item.imgSrc}
                          title={item.title}
                          link={item.link}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12">
              <div className="sidebar">
                <div className="author-list">
                  <h4>Authors</h4>
                  <div className="postlist-col d-flex">
                    <div className="author-icon">
                      <img src="assets/images/user.svg" />
                    </div>
                    <div className="author-detail">
                      <h6>David Wiltshire</h6>
                      <p>
                        Professor of Theoretical Physics, University of
                        Canterbury
                      </p>
                    </div>
                  </div>
                  <div className="postlist-col d-flex">
                    <div className="author-icon">
                      <img src="assets/images/user.svg" />
                    </div>
                    <div className="author-detail">
                      <h6>Eoin O Colgain</h6>
                      <p>
                        Assistant Lecturer in Physical Sciences, Atlantic
                        Technological University
                      </p>
                    </div>
                  </div>
                  <div className="postlist-col d-flex">
                    <div className="author-icon">
                      <img src="assets/images/user.svg" />
                    </div>
                    <div className="author-detail">
                      <h6>Jenny Wagner</h6>
                      <p>
                        Research Scientist in Cosmology, Bahamas Advanced Study
                        Institute & Conferences
                      </p>
                    </div>
                  </div>
                  <div className="postlist-col d-flex">
                    <div className="author-icon">
                      <img src="assets/images/user.svg" />
                    </div>
                    <div className="author-detail">
                      <h6>Shahin Sheikh-Jabbari</h6>
                      <p>
                        Professor in Physics, Institute for Research in
                        Fundamental Sciences
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sidebar-post-list">
                  <h4>Latest News</h4>
                  <div
                    className="blog-advice bg-image-post"
                    style={{
                      backgroundImage: "url(./assets/images/advice6.jpg)",
                    }}
                  >
                    <h5>
                      <a href="#">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui
                      </a>
                    </h5>
                    <div className="date-readtime">
                      <span>June 10,2023</span>
                      <span>
                        <i className="fa-regular fa-clock"></i> 2 minute read
                      </span>
                    </div>
                  </div>

                  <div className="blog-advice">
                    <h5>
                      <a href="#">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui
                      </a>
                    </h5>
                    <div className="date-readtime">
                      <span>June 10,2023</span>
                      <span>
                        <i className="fa-regular fa-clock"></i> 2 minute read
                      </span>
                    </div>
                  </div>
                  <div className="blog-advice">
                    <h5>
                      <a href="#">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui
                      </a>
                    </h5>
                    <div className="date-readtime">
                      <span>June 10,2023</span>
                      <span>
                        <i className="fa-regular fa-clock"></i> 2 minute read
                      </span>
                    </div>
                  </div>
                  <div className="blog-advice">
                    <h5>
                      <a href="#">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui
                      </a>
                    </h5>
                    <div className="date-readtime">
                      <span>June 10,2023</span>
                      <span>
                        <i className="fa-regular fa-clock"></i> 2 minute read
                      </span>
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

export default SingleBlog;
