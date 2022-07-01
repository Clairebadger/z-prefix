import {useState, useEffect} from 'react'
import BlogContext from './components/BlogContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Posts from './components/Posts';
import Header from './components/Header';
import ViewPost from './components/ViewPost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from './components/AddPost';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#45a88b',
    },
    secondary: {
      main: '#355658',
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: '#012e23',
          backgroundImage: "url(https://www.transparenttextures.com/patterns/black-twill.png)"
        }
      }
    }
  }
});

function App() {
  
  let[userId, setUserId] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
    }
  }, []);

  return (
    <ThemeProvider theme = {theme}>
    <div className="App">
      <BlogContext.Provider value = {{userId, setUserId}}>
      {
        userId !== null ?
            <Router>
            <Header/>
              <Routes>
                <Route path = '/all' element ={<Posts user = {false}/>}> </Route>
                <Route path = '/posts/details/:id' element ={<ViewPost/>}> </Route>
                <Route path = '/posts/add' element ={<AddPost/>}> </Route>
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
                <Route path = '/posts/details/:id' element ={<ViewPost/>}> </Route>
                <Route path = '/*' element = {<Login/>}></Route>
          </Routes>
        </Router>
      }
      </BlogContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
