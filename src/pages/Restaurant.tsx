import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, DollarSign } from "lucide-react";
import MenuItemDialog from "../components/MenuItemDialog";
import { Card } from "../components/ui/card";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  ingredients?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Маргарита",
    description: "Классическая итальянская пицца с томатами и моцареллой",
    price: "599 ₽",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    ingredients: ["Томаты", "Моцарелла", "Базилик", "Оливковое масло"],
  },
  {
    id: 2,
    name: "Карбонара",
    description: "Паста с беконом в сливочном соусе",
    price: "499 ₽",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
    ingredients: ["Спагетти", "Бекон", "Сливки", "Пармезан", "Яйцо"],
  },
  {
    id: 3,
    name: "Тирамису",
    description: "Классический итальянский десерт",
    price: "399 ₽",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    ingredients: ["Савоярди", "Маскарпоне", "Кофе", "Какао"],
  },
];

const Restaurant = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
            alt="Restaurant Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white w-full">
              <div className="container mx-auto">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-2">
                  Итальянская кухня
                </h1>
                <div className="flex flex-wrap gap-4 items-center text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary stroke-primary" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>25-35 мин</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-5 h-5" />
                    <span>От 1000 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl mb-6">Меню</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="glass-card cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display text-lg">{item.name}</h3>
                    <span className="font-medium text-primary">{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Menu Item Dialog */}
        <MenuItemDialog
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </div>
  );
};

export default Restaurant;