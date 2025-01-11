import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

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
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем переход на страницу ресторана при клике на кнопку
    toast({
      title: "Добавлено в корзину",
      description: `Ресторан ${name} добавлен в избранное`,
    });
  };

  return (
    <div 
      className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-up cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="relative h-48 sm:h-56 md:h-48 lg:h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="font-display text-lg sm:text-xl">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary stroke-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{cuisine}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500">
            <span>{deliveryTime}</span>
            <span>От {minOrder}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>В корзину</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;