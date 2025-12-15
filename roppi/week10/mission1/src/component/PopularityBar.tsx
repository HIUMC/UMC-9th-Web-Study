interface PopularityBarProps {
  barScale: number;
  popularity: number;
}

const PopularityBar = ({ barScale, popularity  }: PopularityBarProps) => {


  return (

    <>
       <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div
                    className="
                      h-full
                      bg-gradient-to-r from-[#2c2c2c] to-[#000000]
                      origin-left
                      width-[100%]
                      transition-transform
                      duration-700
                      ease-out
                    "
                  style={{
                    transform: `scaleX(${barScale})`,
                  }}
                  />
                </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {popularity.toFixed(0)} / 500
                  </p>
    </>
  )
};

export default PopularityBar;