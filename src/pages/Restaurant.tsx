import { useParams } from "react-router-dom";
import { Star, Clock, Wallet } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "Итальянская кухня",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: 4.8,
    deliveryTime: "25-35 мин",
    minOrder: "1000 ₽",
    cuisine: "Итальянская",
    menu: [
      { id: 1, name: "Пицца Маргарита", price: "599 ₽", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002" },
      { id: 2, name: "Паста Карбонара", price: "499 ₽", image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df" },
      { id: 3, name: "Тирамису", price: "299 ₽", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9" },
    ]
  },
  {
    id: 2,
    name: "Азиатский фьюжн",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7",
    rating: 4.6,
    deliveryTime: "30-45 мин",
    minOrder: "800 ₽",
    cuisine: "Азиатская",
    menu: [
      { id: 1, name: "Суши сет", price: "1299 ₽", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c" },
      { id: 2, name: "Рамен", price: "459 ₽", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624" },
      { id: 3, name: "Пад Тай", price: "399 ₽", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e" },
    ]
  },
  {
    id: 3,
    name: "Русская кухня",
    image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826",
    rating: 4.7,
    deliveryTime: "20-30 мин",
    minOrder: "900 ₽",
    cuisine: "Русская",
    menu: [
      { id: 1, name: "Борщ", price: "299 ₽", image: "https://images.unsplash.com/photo-1550367363-9553f4144001" },
      { id: 2, name: "Пельмени", price: "399 ₽", image: "https://images.unsplash.com/photo-1639667851375-85576e22a5a7" },
      { id: 3, name: "Блины", price: "249 ₽", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f" },
    ]
  },
];

const Restaurant = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    return <div className="container px-4 py-8">Ресторан не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 py-8">
        <div className="relative h-64 rounded-lg overflow-hidden mb-6">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-display">{restaurant.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-primary stroke-primary" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-gray-600" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wallet className="w-5 h-5 text-gray-600" />
              <span>От {restaurant.minOrder}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-display mb-4">Меню</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurant.menu.map((item) => (
              <div key={item.id} className="glass-card rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <p className="text-primary font-medium">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;