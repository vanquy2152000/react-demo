import videoHomePage from "../../assets/videos/video-homepage.mp4"

const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type="video/mp4"
                >
                </source>
            </video>
        </div>
    )
}

export default HomePage;