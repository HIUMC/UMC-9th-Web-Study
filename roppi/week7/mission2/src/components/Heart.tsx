import pinkHeart from "../assets/pinkH.png";
import whiteHeart from "../assets/whiteH.png";

const Heart = ({isLiked, handleLike }) => {
  return (
      <div className="w-full flex justify-center ">
            <img
              src={isLiked ? pinkHeart : whiteHeart}
              onClick={handleLike}
              className="w-6 cursor-pointer hover:scale-110
              "
            />
          </div>
  )
}
export default Heart;