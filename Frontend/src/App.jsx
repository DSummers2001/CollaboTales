import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/HomePage';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import NewCharacter from './pages/NewCharacterPage';
import NewStory from './pages/NewStoryPage';
import Content from './pages/ContentPage';
import AllStoriesPage from './pages/AllContentPage';
import UsersContent from './pages/UsersContentPage';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3001');

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/Register" element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/NewCharacter" element={<NewCharacter/>}/>
          <Route path="/NewStory" element={<NewStory/>}/>
          <Route path="/Content" element={<Content socket={socket} />}></Route>
          <Route path='/allStories' element={<AllStoriesPage/>}></Route>
          <Route path="/UsersContent" element={<UsersContent socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;