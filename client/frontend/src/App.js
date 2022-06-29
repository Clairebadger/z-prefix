import {useState} from 'react'
import BlogContext from './components/BlogContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Posts from './components/Posts';
import Header from './components/Header';
import ViewPost from './components/ViewPost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  let[isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="App">
      <BlogContext.Provider value = {{isAuthenticated, setIsAuthenticated}}>
      {
        isAuthenticated ?
            <Router>
            <Header/>
              <Routes>
                <Route path = '/' element ={<Posts/>}> </Route>
                <Route path = '/posts/details/:id' element ={<ViewPost/>}> </Route>
                <Route path = '/posts/:name' element = {<Posts/>}></Route>
                <Route path = '/*' element = {<Posts/>}></Route>
              </Routes>
          </Router>

          :
          <Router>
            <Routes>
                <Route path = '/' element ={<SignUp/>}> </Route>
                <Route path = '/login' element ={<Login/>}> </Route>
                <Route path = '/posts' element ={<Posts/>}> </Route>
                <Route path = '/*' element = {<Login/>}></Route>
          </Routes>
        </Router>
      }
      </BlogContext.Provider>
    </div>
  );
}

export default App;
/*
{
          
*/