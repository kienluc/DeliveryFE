import { useEffect } from 'react';
import API, {endpoints} from './API'
import { login } from './redux/actions/authActions';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import CreatePost from './pages/CreatePost';
import PostsList from './pages/PostsList';
import UserPostList from './pages/UserPostList';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      API.get(endpoints['currentUser'], { headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }})
      .then((res) => {
        
        dispatch(login(res.data))
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
        <Route  path="/order" component={OrderPage} />
        <Route path="/order-post" component={CreatePost} />
        <Route path="/posts-list" component={PostsList} />
        <Route path="/my-posts" component={UserPostList} />
        <Route exact path="/" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
