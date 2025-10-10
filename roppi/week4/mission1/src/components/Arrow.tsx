
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        right: "-25px",
        zIndex: 1,
        opacity: '30%',
      }}
      onClick={onClick}
    />
  );
};

export const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        left: "-25px",
        zIndex: 1,
        opacity: '30%',
      }}
      onClick={onClick}
    />
  );
};
