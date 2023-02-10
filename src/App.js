import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import AddBlog from './Pages/AddBlog';
import Menu from './Components/Menus';
import ListedBlogs from './Pages/ListAllBlog';
import ReadBlogs from './Pages/ReadBlog';
import { Technologies, Entrepreneur, BusinessIdeas } from './Pages/CategoryBlogs';
import SignUpForm from './Pages/Sign up';
import LoginForm from './Pages/Login';
import RichTextEditor from './Pages/Test';
import StaffSignUp from './Pages/StaffSignUp'
import './styles/index.css'; 


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Menu />
     <div className='All'>

     <Switch>
          <Route  exact path='/' component={ ListedBlogs } />
          <Route path='/Add blogs' component={ AddBlog } />
          <Route path='/Business ideas' component={ BusinessIdeas } />
          <Route path='/Technologies' component={ Technologies } />
          <Route path='/Enterpreneur skills' component={ Entrepreneur } />
          <Route path='/Blogs/:id' component={ ReadBlogs } />
          <Route path='/sign up' component={ SignUpForm } />
          <Route path='/login' component={ LoginForm } />
          <Route path='/text' component={ RichTextEditor } />
          <Route path='/Blogger' component={ StaffSignUp } />
     </Switch>
     </div>
    </div>
  </BrowserRouter>
  );
}
export default App;
