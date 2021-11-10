import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Register from '../components/Register'
import ShipperRegister from '../components/ShipperRegister'
const LoginPage = () => {
    const [active, setActive] = useState(2)
    const user = useSelector(state => state.userLogin.userInfo)
    const history = useHistory()
    const handleActive = (index) => {
        setActive(index)
    }
    useEffect(() => {
      if (user) {
        if (Object.keys(user).length !== 0) {
            history.goBack()
       }
      }
        
    }, [user])
    return (
        <>
            <Navbar />
        <div className="login-page">
            
            <div className="toggle-container">
                <button className={"toggle-button " + (active === 1 || active === 3 ? "button-active" : "") } onClick={() => handleActive(1)}>Đăng kí</button>
                <button className={"toggle-button " + (active === 2 ? "button-active" : "") } onClick={() => handleActive(2)}>Đăng nhập</button>
            </div>
            {
                active === 1 ?
                <Register handleActive={handleActive} />
                : active === 2 ? <Login handleActive={handleActive} />
                : <ShipperRegister />
            }
        </div>
        </>
    )
}

export default LoginPage
