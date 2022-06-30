import {useState} from 'react'
import BlogContext from './components/BlogContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Posts from './components/Posts';
import Header from './components/Header';
import ViewPost from './components/ViewPost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEditPost from './components/AddEditPost';

function App() {
  
  let[userId, setUserId] = useState(null)

  return (
    <div className="App">
      <BlogContext.Provider value = {{userId, setUserId}}>
      {
        userId !== null ?
            <Router>
            <Header/>
              <Routes>
                <Route path = '/all' element ={<Posts user = {false}/>}> </Route>
                <Route path = '/posts/details/:id' element ={<ViewPost/>}> </Route>
                <Route path = '/posts/add' element ={<AddEditPost action='add'/>}> </Route>
                <Route path = '/posts' element = {<Posts user = {true}/>}></Route>
                <Route path = '/*' element = {<Posts user = {true}/>}></Route>
              </Routes>
          </Router>

          :
          <Router>
            <Header/>
            <Routes>
                <Route path = '/' element ={<SignUp/>}> </Route>
                <Route path = '/login' element ={<Login/>}> </Route>
                <Route path = '/posts' element ={<Posts user = {false}/>}> </Route>
                <Route path = '/*' element = {<Login/>}></Route>
          </Routes>
        </Router>
      }
      </BlogContext.Provider>
    </div>
  );
}

export default App;
