import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StoryBody = ({story, socket}) => {
  const [ storyContent ,setStoryContent] = useState(story.content);
  const [ storyTitle ,setStoryTitle] = useState(story.title);
  const navigate = useNavigate();


  useEffect(() => {
    socket.on('messageResponse', (data) => {
      const allStoryContent = data.content;
      setStoryContent( allStoryContent );
    });

  }, [socket, storyContent]);


  const handleLeavestory = () => {
    navigate('/allStories');
    window.location.reload();
  };

  const updateStory = (e) => {
    console.log("The Story Has Been Updated...")
    const newText = e.target.value;

    if ( localStorage.getItem('CollaboTales-user')) {
      socket.emit('message', {
        content: newText,
        socketID: socket.id,
      });
    }

  }

  return (
    <>
      <StoryContainer>
        <div className="brand">
          <a href='/'><img src="/niXpLb97T.png" alt="CollaboTales Logo" /></a>
          <h2>CollaboTales</h2>
          <div>
            <h2>{storyTitle}</h2>
            <h3>Author: {story.author}<br /> CoAuthors: {story.coAuthorList} <br />Genre: {story.genre}</h3>
            <button onClick={handleLeavestory}>LEAVE story</button>
            <textarea onChange={updateStory} value={storyContent}></textarea>
          </div>     
        </div>
      </StoryContainer>
    </>
  );
};


const StoryContainer = styled.div`
width:80vw;
.brand{
    background-color:#131324;
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h2{
        text-align:center;
        color:white;
        text-transform:uppercase;
    }
}
div{
    display:flex;
    flex-direction:column;
    gap:2rem;
    align-items: center;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    width:90%;
    textarea{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        height:35vh;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
            background-color: #131324;
        }
    }
}
`;

StoryBody.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    numberOfLikes: PropTypes.number.isRequired,
    author: PropTypes.string,
    coAuthorList: [PropTypes.string]
  }).isRequired,
  socket: PropTypes.object // Adjust the prop type according to your requirement
};

export default StoryBody;