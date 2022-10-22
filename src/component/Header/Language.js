import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Language = (props) => {
    const { t, i18n } = useTranslation();
    const handleTranslate = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <>
            <NavDropdown title={i18n.language === "vi" ? "Việt Nam" : "English"} id="basic-nav-dropdown" className="languages">
                <NavDropdown.Item onClick={() => handleTranslate('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTranslate('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
export default Language;