import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
  cuisine: string;
}

const RestaurantCard = ({
  id,
  name,
  image,
  rating,
  deliveryTime,
  minOrder,
  cuisine,
}: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-up cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-lg">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary stroke-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{cuisine}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{deliveryTime}</span>
          <span>От {minOrder}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;