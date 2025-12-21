
interface ToggleProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

const AdultToggle = ({ enabled, setEnabled }: ToggleProps) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`
        w-[60px] h-[30px] relative inline-flex  border-[1px] *:items-center rounded-full p-[0]
        ${enabled ? "bg-[#000000]" : "bg-[#ffffff]"}
      `}
    >
      <div
        className={`
          h-[25px] w-[25px] absolute top-1/2 -translate-y-1/2 transform rounded-full transition duration-300
          ${enabled ? "translate-x-[1px] bg-[#ffffff]" : "translate-x-[32px] bg-[#000000]"}
        `}
      ></div>
    </button>
  );
};

export default AdultToggle;
