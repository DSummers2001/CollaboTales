import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';
import { newCharacterRoute } from "../utils/APIRoutes";
import Navbar from "../components/navbar";

function NewCharacter() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        description: "",
    });
    const descriptionBox = {
        width:'700px',
        height:'100px',
    };

    const handleSubmit = async (event) => {
        console.log("You are calling the handleSubmit function")
        event.preventDefault();


        const { name,description } = values;

        const { data } = await axios.post(newCharacterRoute, {
            name,
            description,
        });

        if(data.status === true) {
            // localStorage.setItem('CollaboTales-user', JSON.stringify(data.user));
            navigate("/allStories");
        }

        
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

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
        <>
            <Navbar loggedIn={loggedIn} />
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <input type="text" placeholder="Character Name" name="name" onChange={(e) => handleChange(e)} />
                    <input type="text" placeholder="Character Description" name="description" style={descriptionBox} onChange={(e) => handleChange(e)} />
                    <button type="submit">Create Character</button>
                </form>
            </FormContainer>
        </>
    )
}

const FormContainer = styled.div`
height:100vh;
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

export default NewCharacter;