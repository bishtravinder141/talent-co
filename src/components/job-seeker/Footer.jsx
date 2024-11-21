import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="site_footer copyright">
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-12">
                    <p>© 2023 TalentCo. All Rights Reserved.</p>
                </div>
                <div className="col-md-5 col-12">
                    <ul>
                        <li><Link to={"/contact-us"}>Contact Us</Link></li>
                        <li><Link to={"/faq"}>FAQs</Link></li>
                        <li><Link to={"/about-us"}>About Us</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
