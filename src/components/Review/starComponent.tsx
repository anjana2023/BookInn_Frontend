import React from "react"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai"

const StarComponent:React.FC<any> = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5  
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar color="orange" />
        ) : stars >= number ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    )
  })
  return (
    <>
      <div className=" flex gap-2 align-middle justify-start">
        {ratingStar}
      </div>
    </>
  )
}

export default StarComponent
