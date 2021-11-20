import React from 'react'

const Spinner = ({borderColor, bgColor}) => {
  
    return (
        <div className= {"inline-block my-[-2px]"}>
            <div className={"w-[20px] h-[20px] rounded-[100%] border-2 border-solid border-l-[transparent] animate-spin " + borderColor }></div>
        </div>
    )
}

export default Spinner
