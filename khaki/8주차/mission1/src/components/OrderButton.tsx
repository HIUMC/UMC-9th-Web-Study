type Order = "asc" | "desc";

interface OrderButtonProps {
  order: Order;
  setOrder: (order: Order) => void;
}

export const OrderButton = ({ order, setOrder }: OrderButtonProps) => {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={() => setOrder("asc")}
        className={`px-4 py-2 text-base rounded-l-xl border border-white transition-colors duration-200 ${
          order === "asc" ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        오래된순
      </button>
      <button
        onClick={() => setOrder("desc")}
        className={`px-4 py-2 text-base rounded-r-xl border border-white border-l-0 transition-colors duration-200 ${
          order === "desc" ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        최신순
      </button>
    </div>
  );
};
