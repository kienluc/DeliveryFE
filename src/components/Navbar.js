import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/images/logo.png"
import sublogo from "../assets/images/sublogo.png"
import { BiChevronDown, BiUser, BiStore, BiHighlight, BiLogOut } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import SearchBar from './SearchBar';

const Navbar = ({onInputChange, onGetOrder}) => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => {
        setToggle(!toggle)
    }
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
                    <Link to="/" className="nav-link">Trang chủ</Link>
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
               <div style={{ marginLeft: '15px'}} className="relative cursor-pointer" onClick={handleToggle}>
                  <div className="flex items-center ml-2">
                    <img src={user.avatar} alt="avatar" className="w-[35px] rounded-full" />
                    <p className="mx-2 text-lg font-medium">{user.last_name} {user.first_name} </p>
                    <BiChevronDown className="text-4xl" />
                  </div>
                   {
                       toggle &&  
                       <div className="absolute h-[300px] w-[300px] right-0 flex flex-col text-center p-4 shadow-md justify-between z-50 bg-gray-200">
                           <Link to="/my-account" className="text-2xl font-medium p-2 border-b-[1px] border-gray-300 hover:bg-gray-300">
                               <div className="flex items-center justify-center">
                                   <BiUser className="text-4xl mr-4" />
                                   <p>Thông tin cá nhân</p>
                               </div>
                           </Link>
                           {
                               user?.is_shipper ? null : <Link to="/my-posts" className="text-2xl font-medium p-2 border-b-[1px] border-gray-300 hover:bg-gray-300">
                               <div className="flex items-center justify-center">
                                   <BiHighlight className="text-4xl mr-4" />
                                   <p>Bài đăng</p>
                               </div>
                                </Link>
                           }
                            <Link to="/my-orders" className="text-2xl font-medium p-2 border-b-[1px] border-gray-300 hover:bg-gray-300">
                               <div className="flex items-center justify-center">
                                   <BiStore className="text-4xl mr-4" />
                                   <p>Đơn hàng</p>
                               </div>
                           </Link>
                           <button className="text-2xl font-medium p-2 border-b-[1px] border-gray-300 hover:bg-gray-300" onClick={handleLogout}>
                               <div className="flex items-center justify-center">
                                   <BiLogOut className="text-4xl mr-4"/>
                                   <p>Đăng xuất</p>
                               </div>
                           </button>
                           <p className="text-2xl font-medium p-2">Username: {user?.username}</p>
                       </div>
                   }
               </div>
           }
        </div>
    )
}

export default Navbar
