import styled from 'styled-components';
import {useState, useEffect} from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { specificStoryRoute } from "../utils/APIRoutes";
import Loader from '../components/loader';
import { useNavigate } from 'react-router-dom';
import { addLikeRoute } from "../utils/APIRoutes";

function UsersContent() {
    const [searchParams] = useSearchParams();
    const [storyID, setStoryID] = useState(searchParams.get("id"));
    const [story, setStory ] = useState({
        title: "",
        content: "",
        genre: "",
        numberOfLikes: "",
        author:"",
        coAuthorList: [],
    });
    const [loading, setLoading] = useState(true);
    const [ storyContent ,setStoryContent] = useState("");
    const [ storyTitle ,setStoryTitle] = useState("");
    const [ storyGenre ,setStoryGenre] = useState("");
    const [ storyLikes ,setStoryLikes] = useState();
    const [ storyAuthor ,setStoryAuthor] = useState("");
    const [ storyCoAuthors ,setStoryCoAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchStory = async () => {
            setTimeout( async () => {

          if (!(storyID === "")) {
            const { data } = await axios.post(specificStoryRoute, {
              storyID,
            });
            console.log(data);
            setStoryTitle(data.story.title);
            setStoryContent(data.story.content);
            setStoryGenre(data.story.genre);
            setStoryLikes(data.story.numberOfLikes);
            setStoryAuthor(data.story.author);
            setStoryCoAuthors(data.story.coAuthorList);
          } 
  
          if (!(storyTitle === "")){
            setStory({title:storyTitle, content: storyContent, genre: storyGenre,
                    numberOfLikes: storyLikes, author: storyAuthor, coAuthorList: storyCoAuthors})
            console.log(storyTitle);
            setLoading(false);
          }
        }, 1450);}
    
        fetchStory();
      },[storyTitle]);

      const handleLeavestory = () => {
        navigate('/allStories');
        window.location.reload();
      };

      const likeStory = async (e) => {
        e.preventDefault();
        const id = storyID;
        const numberOfLikes = storyLikes + 1;
        const { data } = await axios.post(addLikeRoute, {
          id,
          numberOfLikes
        });

        setStoryLikes(storyLikes+1);
        console.log(data);
      };

    return (
        <>


                <div>
                    {loading ? (
                        <Loader/>
                    ) : (
                        <StoryContainer>
                                <div className="brand">
                                    <a href='/'><img src="/niXpLb97T.png" alt="CollaboTales Logo" /></a>
                                    <h1>CollaboTales</h1>
                                    <div>
                                        <h2>{storyTitle}</h2>
                                        <h3>Author: {story.author}<br /> CoAuthors: {story.coAuthorList} <br />Genre: {story.genre}</h3>
                                        <button className='otherbutton' onClick={handleLeavestory}>LEAVE story</button>
                                        <p>{story.content}</p>
                                        <button className='likeButton' onClick={likeStory}><img src="../src/assets/likeIcon.png" alt="Like Logo" /><h2>{storyLikes}</h2></button>
                                        {/* <button className='otherbutton'>Comment</button> */}
                                    </div>     
                                </div>
                        </StoryContainer>
                    )}
                    </div>
        </>
    )
}

const StoryContainer = styled.div`
${'' /* height:100vh; */}
font-size: 1.25rem;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:0rem;
align-items:center;
background-color:#131324;
margin-bottom: 3rem;
.brand{
    background-color:#131324;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h2,h1,h3,a{
        text-align:center;
        color:white;
        text-transform:uppercase;
    }
div{
    display:flex;
    flex-direction:column;
    gap:2rem;
    justify-content: center;
    align-items: center;
    background-color:#00000076;
    border-radius:2rem;
    margin:3rem 5rem;
    padding-bottom: 3rem;
    p{
        background-color:transparent;
        padding:1rem;
        ${'' /* border:0.1rem solid #4e0eff;
        border-radius:0.4rem; */}
        color:white;
        width:80%;
        font-size:1.5rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
}
.likeButton{
    font-size:1rem;
    display:flex;
    flex-direction:row;
    padding:none;
    border:none;
    background-color:transparent;
    &:hover{
      background-color:transparent;
    }
    img{
        height:4rem;
        &:hover{
            height:5rem;
        }
    }
}
.otherbutton{
  background-color:#997af0;
  color:white;
  width: 20rem;
  padding:1rem 2rem;
  border:none;
  font-weight:bold;
  cursor:pointer;
  border-radius:0.4rem;
  font-size:1rem;
  text-transform:uppercase;
  transition:0.5s ease-in-out;
  &:hover{
      background-color:#4e0eff;
  }
}
`;

export default UsersContent;