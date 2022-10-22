import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoHomePage from "../../assets/videos/video-homepage.mp4"

const HomePage = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const { t } = useTranslation();


    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type="video/mp4"
                >
                </source>
            </video>
            <div className="homepage-content">
                <div className="title-1">
                    {t('homepage.title1')}
                </div>
                <div className="title-2">
                    {t('homepage.title2')}
                </div>
                <div className="title-3">
                    {
                        isAuthenticated === false ?
                            <button className="btn-getstart" onClick={() => navigate('/login')}>
                                {t('homepage.title3child1')}
                            </button>
                            :
                            <button className="btn-quiz" onClick={() => navigate('/users')}>
                                {t('homepage.title3child2')}
                            </button>
                    }
                </div>
            </div>
        </div >
    )
}

export default HomePage;