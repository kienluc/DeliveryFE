import React, {useState} from 'react'
import { BiArrowToTop } from "react-icons/bi";
const BackToTop = () => {
    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300){
        setVisible(true)
      } 
      else if (scrolled <= 300){
        setVisible(false)
      }
    };
    
    const scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });
    };
    
    window.addEventListener('scroll', toggleVisible);
    return (
        <div className={"fixed z-50 flex items-center justify-center  bottom-[100px] right-[40px] w-[80px] h-[80px] cursor-pointer " + (!visible && "hidden")} onClick={scrollToTop}>
            <div className="flex flex-col items-center text-[#f26522]">
              <BiArrowToTop className="text-[50px] text-[#f26522]"/>
              <p className="text-2xl font-semibold">TOP</p>
            </div>
            
        </div>
    )
}

export default BackToTop
