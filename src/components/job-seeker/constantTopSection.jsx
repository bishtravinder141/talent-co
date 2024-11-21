const ConstantTopSection = ({
  heading,
  title,
  search = false,
  placeholder = "Ask a question...",
  searchButton = true,
  supportButton = false,
}) => {
  return (
    <section className="inner-banner">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>{heading}</h2>
            {title && <p>{title}</p>}
            {search && (
              <form className={`banner-seach ${searchButton ? "ask-que" : ""}`}>
                <input type="text" name="" placeholder={placeholder} />
                {searchButton && (
                  <button type="button" className="btn-design">
                    Search
                  </button>
                )}
              </form>
            )}
            {supportButton && (
              <button className="supportBtn">Support Center</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstantTopSection;
