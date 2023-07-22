import StarIcon from "./starIcon";

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half-star

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const filled = index < roundedRating;
                return <StarIcon key={index} filled={filled} />;
            })}
        </div>
    );
};

export default StarRating;
