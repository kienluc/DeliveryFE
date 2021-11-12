import { useEffect } from 'react';
import API, {endpoints} from './API'
import { login } from './redux/actions/authActions';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import CreatePost from './pages/CreatePost';
import PostsList from './pages/PostsList';
import UserPostList from './pages/UserPostList';
import OrderList from './pages/OrderList';
import Profile from './pages/Profile';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      API.get(endpoints['currentUser'], { headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }})
      .then((res) => {
        
        dispatch(login(res.data))
        history.goBack()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Route  path="/login" component={LoginPage} />
        <ProtectedRoute  path="/order" component={OrderPage} />
        <ProtectedRoute path="/order-post" component={CreatePost} />
        <ProtectedRoute path="/posts-list" component={PostsList} />
        <ProtectedRoute path="/my-posts" component={UserPostList} />
        <ProtectedRoute path="/my-orders" component={OrderList} />
        <ProtectedRoute path="/my-account" component={Profile} />
        <Route exact path="/" component={Home} />
        <Route path='/admin' component={() => { 
     window.location.href = 'http://127.0.0.1:8000/admin'; 
     return null;
}}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
