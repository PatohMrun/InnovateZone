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
// import CommentMessagess from './Components/T';
import Footer from './Components/Footer';
import Messages from './Pages/Messages';
// import Test from './Pages/Test1234';
import Update from './Pages/Update';
import Approval from './Config/Approval';
import Pending from './Config/PendingApproval';
import Bloggers from './Components/bloggers';
import verification from './Config/verify-email';
import './styles/index.css'; 


function App() {
  return (
    <BrowserRouter className="wrapper">
    <div className="App">
      <Menu />
     <div className='All'>

     <Switch>
          <Route  exact path='/Home' component={ ListedBlogs } />
          {/* <Route  exact path='/W' component={ CommentMessagess } /> */}
          <Route path='/admin/addblogs' component={ AddBlog } />
          <Route path='/category/business-ideas' component={ BusinessIdeas } />
          <Route path='/category/technologies' component={ Technologies } />
          <Route path='/category/Enterpreneur-skills' component={ Entrepreneur } />
          <Route path='/Blogs/:id' component={ ReadBlogs } />
          {/* <Route path='/sign up' component={ SignUpForm } /> */}
          <Route path='/login' component={ LoginForm } />
          {/* <Route path='/text' component={ RichTextEditor } /> */}
          <Route path='/Blogger' component={ StaffSignUp } />
          <Route path='/messages' component={ Messages } />
          {/* <Route path='/Test' component={ Test } /> */}
          <Route path='/Approval' component={ Approval } />
          <Route path='/pending' component={ Pending } />
          <Route path='/bloggers' component={ Bloggers } />
          <Route path='/verify' component={ verification } />
          <Route path='/Update/:id' component={ Update } />
          <Route component={ListedBlogs} />
     </Switch>
     </div>
     <Footer/>
    </div>
  </BrowserRouter>
  );
}
export default App;
