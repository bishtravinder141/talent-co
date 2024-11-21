import { FAQ_ITEMS } from "./constant";

const FAQAccordion = () => {
  return (
    <div className="accordion" id="accordionExample">
      {FAQ_ITEMS.map((item) => (
        <div className="accordion-item" key={item.id}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#faq-collapse${item.id}`}
              aria-expanded="false"
              aria-controls={`faq-collapse${item.id}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`faq-collapse${item.id}`}
            className="accordion-collapse collapse"
            aria-labelledby={item.id}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
