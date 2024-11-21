import ConstantTopSection from "../../../components/job-seeker/constantTopSection";
import { faqItems } from "./constat";
import "../job-seeker-dashboard.css";
import FAQAccordion from "../../../components/faq/FAQAccordion";

const Faq = () => {
  return (
    <>
      <main>
        <ConstantTopSection
          heading="Frequently Asked Questions"
          title="Have questions? We’re here to help."
        />

        <section className="faqs_sec py-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="faq-col">
                  <FAQAccordion />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Faq;
