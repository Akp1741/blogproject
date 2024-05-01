import logo from './logo.svg';
import './App.css';
import Login from './Components/Login.Js';
import BlogList from './Components/BlogList';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import BlogForm from './Components/BlogForm';


function App() {
  return (
   <Router>
     <div>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/blogList" element={<BlogList/>}></Route>
        <Route path="/Add" element={<BlogForm/>}></Route>
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
     </div>
   </Router>
);
}

export default App;
