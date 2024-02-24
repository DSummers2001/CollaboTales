import "../App.css";
import { useState, useEffect} from 'react';
import Navbar from "../components/navbar"


function Home() {

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('CollaboTales-user'));
        if (storedData) { // Make More Secure
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <div>
            <Navbar loggedIn={loggedIn} />
            <div className="contentHomeTitle">
                <h2>Welcome to CollaboTales! We are glad to have you here</h2>
                <p>Our mission as a team is to revolutionize the creative process - Fueling the imagination of game developers, authors, and filmmakers alike. Dive into a realm where crafting captivating stories and characters becomes an artistry seamlessly realized with our cutting-edge application.</p>
            </div>
            <div className="titleHomeImages">
                <h4>Below are some famous games that have been recognized using our app.</h4>
            </div>
            <div className="gameSlideshow">
                <div className="mover1"></div>
                <div className="mover2"></div>
            </div>
            <div className="titleHomeImages2">
                <h4>If those dont catch your attention how about taking a look at these films!</h4>
            </div>
            <div className="filmSlideshow">
                <div className="mover3"></div>
                <div className="mover4"></div>
            </div>
            <div className="footerHomeHeading">
                <p>I guess youre primed and ready to get started now huh!</p>
            </div>
            <div className="buttonsHome">
                <a id="newStoryButton" href="/newStory">New Story</a>
                <a id="allStoriesButton" href="/allStories">All Stories</a>
            </div>
            <div className="footerHome">
                <p>&copy; CollaboTales INC.</p>
                <div className="team">
                    <a href="https://www.linkedin.com/in/dillon-summers/" className="dillon"><img src="/1678640384927.jpg" alt="Dillons picture"></img></a>
                    <a href="https://www.linkedin.com/in/sarah-fought-366614133/" className="sarah"><img src="/IMG_4145.jpg"></img></a>
                    <a href="https://www.linkedin.com/in/cody-pattison/" className="cody"><img src="/Cody.jpg.jpg"></img></a>
                    <a href="https://www.linkedin.com/in/isabel-santiago-lewis-00b76b1b8/" className="isabel"><img src="/Isabel.jpg"></img></a>
                </div>
            </div>
        </div>
    );
}

export default Home;