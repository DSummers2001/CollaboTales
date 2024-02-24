import {useEffect, useState} from 'react'
import StoryBody from '../components/StoryBody';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { updateStoryRoute } from "../utils/APIRoutes";
import { specificStoryRoute } from "../utils/APIRoutes";
import styled from 'styled-components';
import Loader from '../components/loader';


const Content = ({ socket }) => {
    const [searchParams] = useSearchParams();
    const [allStoryContent, setAllStoryContent] = useState("");
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
    const [response, setResponse] = useState("");
    const [fetched, setFetched] = useState(false);

    const saveStory =  async (e) =>{
      e.preventDefault();
      const updateStory = async () => {
        if (!(storyID === "")) {
          const id = storyID;
          const content = allStoryContent;
          const { data } = await axios.post(updateStoryRoute, {
            id,
            content
          });
          console.log(data);
        } 
      };
  
      updateStory();
    }; 

    useEffect( () =>{
      setTimeout( async () => {
        console.log(loading) 
        console.log(storyID)
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
      
        console.log(storyTitle)
        if (!(storyTitle === "")){
          setStory({title:storyTitle, content: storyContent, genre: storyGenre,
            numberOfLikes: storyLikes, author: storyAuthor, coAuthorList: storyCoAuthors})
          console.log(storyTitle);
          setLoading(false);
        } 
        console.log(loading)
      }, 1450)
      // const fetchStory = async () => {
      //   console.log(loading) 
      //   console.log(storyID)
      //   if (!(storyID === "")) {
      //     const { data } = await axios.post(specificStoryRoute, {
      //       storyID,
      //     });
      //     console.log(data);
      //     setStoryTitle(data.story.title);
      //     setStoryContent(data.story.content);
      //   } 
      
      //   console.log(storyTitle)
      //   if (!(storyTitle === "")){
      //     setStory({title:storyTitle, content: storyContent})
      //     console.log(storyTitle);
      //     setLoading(false);
      //   } 
      //   console.log(loading)
      // };
      // sleep(5000);
      // setTimeout(()=> {console.log("story is loading..")}, 5000)
      // fetchStory();
    },[storyTitle])

    useEffect(() => {
      socket.on('messageResponse', (data) => {
        const tempAllStoryContent = data.content;
        setAllStoryContent(tempAllStoryContent);
        setStory({ ...story, content: allStoryContent });
        console.log(story);
      });
    }, [socket, allStoryContent,story]);

    const useAI = async () =>{
      setAiIsVisible(true);
      if (!fetched) {
        try {
          const apiKey = "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";
          const apiUrl = `https://api.openai.com/v1/chat/completions`;

          const prompt =  `Add to this story: ${storyContent}`;
          console.log(prompt);
          const data = {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant" },
              {
                role: "user",
                content: prompt,
              },
            ],
          };
          console.log(data);

          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(data),
          };

          const result = await fetch(apiUrl, requestOptions);
          const jsonResult = await result.json();

          console.log(jsonResult);
          const contentValue = jsonResult.choices[0]?.message?.content;
          setResponse(JSON.stringify(contentValue, null, 2));
          setFetched(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const [aiIsVisible, setAiIsVisible] = useState(false);
    const aiInput = aiIsVisible ? 'aiIsVisible' : 'aiIsHidden';
    const handleNoClick = () => {
      setAiIsVisible(false);
    }

    return (
          <div>
          {loading ? (
                  <Loader />
                ) : (
                  <StoryContainer>
                      <StoryBody story={story} socket={socket}/>
                      <button onClick={saveStory}>Save story</button>
                      <h3>Need Ideas? Get Help With Our New AI Feature!</h3>
                      <button onClick={useAI}>AI CoAuthor</button>
                      {fetched ? (
                        <div className={aiInput}>
                          <h3>{response}</h3>
                          {/* <button>Save Suggestion</button> */}
                        </div>
                      ) : (
                        <h3 className={aiInput}>Loading...</h3>
                      )}
                  </StoryContainer>
                )}
          </div>
      );
};

Content.propTypes = {
  socket: PropTypes.object
};

const StoryContainer = styled.div`
.aiIsVisible{
    display:block;
    color: white;
    text-align: center;
    width: 80%;
    button{
      text-align:center;
    }
}
.aiIsHidden{
        display:none;
}

${'' /* height:100vh; */}
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
gap:0rem;
align-items:center;
background-color:#131324;
margin-bottom: 3rem;
h3{
        text-align:center;
        color:white;
}
button{
  background-color:#997af0;
  width: 20rem;
  color:white;
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

export default Content;