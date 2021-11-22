import React, { useState } from 'react'
import Slider from "react-slick";
import partner1 from "../assets/images/partner1.png"
import partner2 from "../assets/images/partner2.png"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import fast from '../assets/images/sixhours.png'
import feature1 from '../assets/images/feature1.png'
import feature2 from '../assets/images/feature2.png'
import feature3 from '../assets/images/feature3.png'
import feature4 from '../assets/images/feature4.png'
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa"
import API, {endpoints} from '../API'

import TrackingDetail from '../components/TrackingDetail';

const settings = {
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    className: 'partner-item'
  };
const Home = () => {
    const [trackingId, setTrackingId] = useState('')
    const [order, setOrder] = useState({})
    const [modal, setModal] = useState(false)
    const handleChange = (event) => {
        console.log(event.target.value)
        setTrackingId(event.target.value)
    }
    const handleOpenModal = () => {
        setModal(!modal)
    }
    const getOrder = async () => {
        try {
            const response = await API.get(`${endpoints['orders']}${trackingId}/`, { headers: { 'Content-type': 'application/json'} })
            setOrder(response.data)
            handleOpenModal()
        } catch (error) {
            alert('Không tìm thấy đơn hàng !')
        }
    }

    return (
        <div className="relative">
            <Navbar onInputChange={handleChange} onGetOrder={getOrder} />
            <Carousel />
            <div className="home-fast">
                <h1 className="home-fast-title">GIAO NHANH HƠN 6 TIẾNG</h1>
                <p className="home-fast-description" style={{fontSize: '1.3rem', margin: '40px 0'}}>GHN giúp bạn giao đến người nhận nhanh hơn 6 tiếng so với các đơn vị vận chuyển khác</p>
                <div className="home-fast-img">
                  <img src={fast} alt="fast" />
                </div>
            </div>
            <div className="home-features">
                <div className="home-features-item">
                    <img className="feature-img" src={feature1} alt='feature'/>
                    <p className="feature-desc">Top công ty giao nhận <br /> hàng đầu VN
                    </p>
                </div>
                <div className="home-features-item">
                    <img  className="feature-img" src={feature2} alt='feature'/>
                    <p className="feature-desc">Giao nhận phủ sóng <br /> 63 tỉnh thành
                    </p>
                </div>
                <div className="home-features-item">
                    <img className="feature-img" src={feature3} alt='feature'/>
                    <p className="feature-desc">Giao hàng nhanh <br /> tỷ lệ hoàn hàng thấp
                    </p>
                </div>
                <div className="home-features-item">
                    <img className="feature-img" src={feature4} alt='feature'/>
                    <p className="feature-desc">Hệ thống quản lý <br /> trực tuyến 24/7
                    </p>
                </div>
            </div>
            <div className="flex justify-around bg-black text-gray-400 py-10 mt-5">
            <div className="">
                <h1 className="text-2xl mb-3">Thông Tin Liên Hệ</h1>
                <p className="text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>          
                    371 Nguyễn Kiệm, phường 3, quận Gò Vấp, Tp.HCM
                </p>
                <p className="text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    ghnexpress@mail.com
                </p>
                <p className="text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    0834697489 / 0909161278
                </p>
                <p></p>
            </div>
            <div className="social">
                <h1 className="text-2xl mb-3">Mạng Xã Hội</h1>
                <p className="text-xl flex items-center">
                    <FaFacebook className="mr-2" /> facebook.com/ghnexpress
                </p>
                <p className="text-xl flex items-center">
                    <FaInstagram  className="mr-2"/> @ghn_express
                </p>
                <p className="text-xl flex items-center">
                    <FaYoutube className="mr-2"/> youtube.com/ghnexpress
                </p>
                <p className="text-xl flex items-center">
                    <FaTwitter className="mr-2"/> @ghn_express
                </p>
            </div>
        </div>
            <TrackingDetail order={order} modal={modal} onModal={handleOpenModal} />
        </div>
    )
}

export default Home
