import  { PAGINATION_ORDER } from "../../enums/common";

interface OrderProps {
  order: 'asc' |'desc'
  setOrder: (value: 'asc' | 'desc') => void; 
}

const OrderBtn = ({order, setOrder} : OrderProps ) => {
  return (
    <>
         <div className="flex">
           <div className="flex w-40 rounded border border-gray-50 border-[0.2px] overflow-hidden">
             <button
               onClick={() => setOrder(PAGINATION_ORDER.DESC)}
               className={`w-20 px-3 py-1 cursor-pointer ${
                 order === PAGINATION_ORDER.DESC
                   ? "text-black bg-white font-bold"
                   : "bg-black text-gray-300"
               }`}
             >
               최신순
             </button>
             <div className="h-[32px]"></div>
             <button
               onClick={() => setOrder(PAGINATION_ORDER.ASC)}
               className={`w-20 px-3 py-1  cursor-pointer ${
                 order === PAGINATION_ORDER.ASC
                   ? "text-black bg-white font-bold"
                   : "bg-black text-gray-300"
               }`}
             >
               오래된순
             </button>
           </div>
          </div>
    </>
    
  )

}
export default OrderBtn;