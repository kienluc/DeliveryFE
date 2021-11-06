import React from 'react'
import Slider from "react-slick";
import carousel_1 from "../assets/images/slideshow_1.png"
import carousel_2 from "../assets/images/slideshow_2.png"
import carousel_3 from "../assets/images/slideshow_3.png"
import carousel_4 from "../assets/images/slideshow_4.png"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const carouselContent = [
  'GHN Liên Tục Cập Nhật Tuyến Ảnh Hưởng Do Dịch',
  'Giao/Nhận Hàng Tại HCM Chính Thức Trở Lại Bình Thường',
  'Dịch Vụ Giao Hàng Thương Mại Điện Tử',
  'Dịch Vụ Kho Và Xử Lý Đơn Hàng'
]

const Carousel = () => {
    const settings = {
        customPaging: function(i) {

          return (
             <p style={{ fontSize: '1.3rem'}}>
               {carouselContent[i]}
              </p>
          )
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        className: "carousel-item",
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };
    return (
        <div>
        <Slider {...settings}>
          <div>
            <img src={carousel_1} className="carousel-img"   alt='carousel-img' />
          </div>
          <div>
             <img src={carousel_2}  className="carousel-img" alt='carousel-img' />
          </div>
          <div>
             <img src={carousel_3}  className="carousel-img" alt='carousel-img' />
          </div>
          <div>
              <img src={carousel_4}  className="carousel-img" alt='carousel-img' />
          </div>
        </Slider>
      </div>
    )
}

export default Carousel
