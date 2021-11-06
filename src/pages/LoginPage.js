import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Register from '../components/Register'
import ShipperRegister from '../components/ShipperRegister'
const LoginPage = () => {
    const [active, setActive] = useState(2)
    const handleActive = (index) => {
        setActive(index)
    }

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
