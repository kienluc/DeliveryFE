import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/images/logo.png"
import sublogo from "../assets/images/sublogo.png"
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import SearchBar from './SearchBar';

const Navbar = ({onInputChange, onGetOrder}) => {
    const user = useSelector(state => state.userLogin.userInfo)
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }
    return (
        <div className="navbar">
           <div className="logo">
               <img src={logo} className="logo-img" alt="logo" />
           </div>
           <ul className="nav-items">
                <li className="nav-item">
                    <Link className="nav-link">Trang chủ</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link">Dịch vụ</Link>
                    <div className="down-icon"><BiChevronDown /></div>
                    <div className="sub-menu">
                        <div className="sub-menu-item">
                            <Link className="sub-menu-item-link">
                            <div className="sub-menu-item-logo">
                                <img src={sublogo} alt="sub-logo"/>
                            </div>
                            <div className="sub-menu-item-content">
                                <h3 className="sub-menu-item-title">GHN Express</h3>
                                <p className="sub-menu-item-description">
                                    Dịch vụ giao hàng thương mại điện tử, giao hàng toàn quốc, miễn phí thu hộ COD, miễn phí giao hàng, miễn phí trả hàng.
                                </p>
                            </div>
                            </Link>
                        </div>
                        <div className="sub-menu-item">
                            <Link className="sub-menu-item-link">
                            <div className="sub-menu-item-logo">
                                <img src={sublogo} alt="sub-logo"/>
                            </div>
                            <div className="sub-menu-item-content">
                                <h3 className="sub-menu-item-title">GHN Express</h3>
                                <p className="sub-menu-item-description">
                                    Dịch vụ giao hàng thương mại điện tử, giao hàng toàn quốc, miễn phí thu hộ COD, miễn phí giao hàng, miễn phí trả hàng.
                                </p>
                            </div>
                            </Link>
                        </div>
                        <div className="sub-menu-item">
                            <Link className="sub-menu-item-link">
                            <div className="sub-menu-item-logo">
                                <img src={sublogo} alt="sub-logo"/>
                            </div>
                            <div className="sub-menu-item-content">
                                <h3 className="sub-menu-item-title">GHN Express</h3>
                                <p className="sub-menu-item-description">
                                    Dịch vụ giao hàng thương mại điện tử, giao hàng toàn quốc, miễn phí thu hộ COD, miễn phí giao hàng, miễn phí trả hàng.
                                </p>
                            </div>
                            </Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link">Tin tức</Link>
                </li>
               {
                   !user?.is_shipper &&  <li className="box-register">
                                            <Link to="/order-post" className="nav-link">
                                                Đăng bài giao hàng
                                            </Link>
                                        </li> 
               }
           </ul>
                {
                    user?.is_shipper ? <div className="box-register">
                    <Link to="/posts-list">Danh sách bài đăng</Link>
                </div> :
                <div className="box-register">
                    <Link to="/order">Đặt giao hàng</Link>
                </div>
                }
               {
                   !user?.username &&
                   <div className="box-register">
                        <Link to="/login">Đăng ký / Đăng nhập</Link>
                    </div>
               }
            <SearchBar onInputChange={onInputChange} onGetOrder={onGetOrder} />
           {
               user?.username && 
               <div style={{ marginLeft: '15px'}}>
                   <p style={{fontSize: '18px'}}>{user.username}, </p>
                   <button className="box-register" style={{border: 'none'}} onClick={handleLogout}>Đăng xuất</button>
               </div>
           }
        </div>
    )
}

export default Navbar
