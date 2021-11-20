import React, { useState } from 'react'
import API, {endpoints} from '../API'
import { useDispatch } from "react-redux";
import Spinner from './Spinner'
import { login } from '../redux/actions/authActions';
import { useHistory } from "react-router-dom";
const Login = ({handleActive}) => {
    const [info, setInfo] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(null)
    const [error, setError] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const handleChange = (event) => {
       
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const data = {
            'username': info.username,
            'password': info.password,
            'client_id': 'xNehG6Jn1IKE01ZT93HGx1YBWUl1yqOwtnjnwPBy',
            'client_secret': 'sy3Tp150IR89tSwe8fy6ZSPwKWbZftjtbmigQwg3jYUxAk2ckIDxYD7GVTe4QbzFSCClLOgmTn0VzA6Nyd1eJjRsGa8qrY5U8sNXXYPWz55xKfJiOwVHdLW6ZcUnYgzz',
            'grant_type': 'password'
        }

        API.post(endpoints["login"], data, { headers: { 'Content-type': 'application/json' } })
        .then(res => {
            localStorage.setItem('token', res.data.access_token)
            history.goBack()
            API.get(endpoints["currentUser"], { headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${res.data.access_token}` } })
            .then(res => {
                dispatch(login(res.data))
                setLoading(false)
            })
            .catch(err => console.log(err.response))
            })
        .catch(err => {
            setLoading(false)
            console.log(err.response)
        })
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="login-item">
                <label>Tài khoản</label>
                <input className="login-input" placeholder="Nhập tài khoản" name="username" onChange={handleChange} required/>
            </div>
            <div className="login-item">
                <label>Mật khẩu</label>
                <input className="login-input" placeholder="Nhập mật khẩu" type="password" name="password" onChange={handleChange} required/>
            </div>
            <button className="login-button" type="submit">{loading ? <Spinner /> : <p>Đăng nhập</p>}</button>
            <p className="no-account">Bạn chưa có tài khoản ? <span style={{color: '#f26522', fontWeight: 700, cursor: 'pointer'}} onClick={() => handleActive(1)}>Đăng kí ngay</span></p>
        </form>
    )
}

export default Login
