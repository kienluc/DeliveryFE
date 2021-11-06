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
            const response = await API.get(`${endpoints['tracking']}${trackingId}/`, { headers: { 'Content-type': 'application/json'} })
            setOrder(response.data)
            handleOpenModal()
        } catch (error) {
            console.log(error)
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
            <div className="partners">
                <Slider {...settings} >
                    <div className="partner-item" >
                        <img src={partner1} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner2} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner1} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner2} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner1} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner2} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner1} alt='partner-item' />
                    </div>
                    <div className="partner-item" >
                        <img src={partner2} alt='partner-item' />
                    </div>
                </Slider>
            </div>
            <TrackingDetail order={order} modal={modal} onModal={handleOpenModal} />
        </div>
    )
}

export default Home
