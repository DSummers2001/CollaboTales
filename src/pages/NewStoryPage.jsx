import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import { newStoryRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userExistsRoute } from "../utils/APIRoutes";

function NewStory() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        title: "",
        genre: "",
        author:"",
        content:"",
        coAuthor: "",
    });
    const [coAuthorList, setCoAuthorList] = useState([]);

    useEffect(()=>{
        const storedUser = localStorage.getItem('CollaboTales-user');
        if (storedUser) {
            const userObject = JSON.parse(storedUser);
            setValues({ ...values, author: userObject.username});
        }
    },[])

    const handleSubmit = async (event) => {
        console.log("You are calling the handleSubmit function")
        event.preventDefault();

        const { title,genre,author,content } = values;
        
        let data;
        if (!coAuthorInputIsVisible){
            ({ data } = await axios.post(newStoryRoute, {
                author: author,
                title: title,
                genre: genre,
                content: content,
            }));
        } else {
            ({ data } = await axios.post(newStoryRoute, {
                author: author,
                title: title,
                genre: genre,
                content: content,
                coAuthorList: coAuthorList,
            }));
        }

        if(data.status === true) {
            navigate({
                pathname:'/Content',
                search: `?id=${data.story._id}`
            });
        }

        console.log(data.story)
        
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const [coAuthorInputIsVisible, setCoAuthorInputIsVisible] = useState(false);
    const handleYesClick = () => {
        setCoAuthorInputIsVisible(true);
    }
    const coAuthorInput = coAuthorInputIsVisible ? 'coAuthorVisible' : 'coAuthorHidden';
    const handleNoClick = () => {
        setCoAuthorInputIsVisible(false);
    }

    const userNameCheck = async () => {
        console.log("You are in the userName check function")
        const { coAuthor,author } = values;
        const username = coAuthor;
        console.log(username)
        const { data } = await axios.post(userExistsRoute, {
            username,
        });
        console.log(data.status)
        if(data.status === false) {
            toast.error(data.msg, toastOptions);
        }
        if(data.status === true) {
            
            if (!coAuthorList.includes(coAuthor) && (coAuthor!==author)){
                setCoAuthorList(prevList => [...prevList, coAuthor]);
                setValues({ ...values, coAuthor: "" });
            }

        }
    }

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <a href='/'><img src="/niXpLb97T.png" alt="CollaboTales Logo" /></a>
                        <h1>CollaboTales</h1>
                    </div>
                    <input type="text" placeholder="Story Title" name="title" onChange={(e) => handleChange(e)} />
                    <input type="text" placeholder="Story Genre" name="genre" onChange={(e) => handleChange(e)} />
                    <h3>Are they any Co-Authors?</h3>
                    <button type="button" onClick={() => handleYesClick()}>Yes</button>
                    <input type="text" id="coAuthorBox" value={values.coAuthor} placeholder="CoAuthor's Username" name="coAuthor" onChange={(e) => handleChange(e)} className={coAuthorInput}/>
                    <button type="button" className={coAuthorInput} onClick={() => userNameCheck() }>Add CoAuthor</button>

                    {/* Display the list of co-authors on the webpage */}
                    {coAuthorList.length > 0 && (
                        <ul className={coAuthorInput}>
                            {coAuthorList.map((coAuthor, index) => (
                                <li key={index}>{coAuthor}</li>
                            ))}
                        </ul>
                    )}


                    <button type="button" onClick={() => handleNoClick()}>No</button>
                    <button type="submit">Create Story</button>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    h3{
        color:white;
    }
    button{
        background-color:#997af0;
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
    .coAuthorVisible{
        display:block;
        color: white;
        list-style-type: none;
    }
    .coAuthorVisible li{
        font-size: x-large;
    }
    .coAuthorHidden{
        display:none;
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;

export default NewStory;