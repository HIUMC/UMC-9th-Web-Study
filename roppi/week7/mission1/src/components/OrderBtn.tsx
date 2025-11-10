
interface OrderProps {
  order: 'asc' |'desc'
  setOrder: (value: 'asc' | 'desc') => void; 
}

const OrderBtn = ({order, setOrder} : OrderProps ) => {
  return (
    <>
     <div className="flex justify-end gap-2 mb-2">
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1 rounded ${
              order === "desc"
                ? "bg-white text-black font-semibold"
                : "bg-[#303030] text-gray-400"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1 rounded ${
              order === "asc"
                ? "bg-white text-black font-semibold"
                : "bg-[#303030] text-gray-400"
            }`}
          >
            오래된순
          </button>
          </div>
    </>
    
  )

}
export default OrderBtn;