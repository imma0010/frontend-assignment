interface StarIconProps {
  filled: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ filled }) => {
  return (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L15.09 8.5H22L16.25 13.12L19.34 19.5L12 15.75L4.66 19.5L7.75 13.12L2 8.5H8.91L12 2Z" />
    </svg>
  );
};

export default StarIcon;
