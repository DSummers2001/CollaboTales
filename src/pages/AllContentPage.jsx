import { useState, useEffect } from 'react';
import axios from 'axios';
import { allStoriesRoute } from '../utils/APIRoutes';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const AllStoriesPage = () => {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        try {
            axios.get(allStoriesRoute)
            .then(response => setStories(response.data))
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    }, []);

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('CollaboTales-user'));
        if (storedData) { // Make More Secure
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const handleStoryClick = (story) => {
        const storedData = JSON.parse(localStorage.getItem('CollaboTales-user'));
        const isAuthorOrCoAuthor = story.author === storedData.username || story.coAuthorList.includes(storedData.username);
        if (isAuthorOrCoAuthor) {
            navigate(`/content?id=${story._id}`);
        } else {
            navigate(`/usersContent?id=${story._id}`);
        }
    };

    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <div className='allStories'>
                <h1>All Stories</h1>
                <div className='allStoriesContent'>
                <ul>
                    {stories.map((story) => (
                    <li key={story._id}>
                        <h2><a href="" onClick={() => handleStoryClick(story)}>{story.title}</a></h2>
                        <p>Author: {story.author}</p>
                        <p>Genre: {story.genre}</p>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </>
    );

}

export default AllStoriesPage;