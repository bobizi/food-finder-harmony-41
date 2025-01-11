import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
  {
    id: 1,
    name: "Итальянская кухня",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: 4.8,
    deliveryTime: "25-35 мин",
    minOrder: "1000 ₽",
    cuisine: "Итальянская",
  },
  {
    id: 2,
    name: "Азиатский фьюжн",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7",
    rating: 4.6,
    deliveryTime: "30-45 мин",
    minOrder: "800 ₽",
    cuisine: "Азиатская",
  },
  {
    id: 3,
    name: "Русская кухня",
    image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826",
    rating: 4.7,
    deliveryTime: "20-30 мин",
    minOrder: "900 ₽",
    cuisine: "Русская",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-display text-center mb-8 animate-fade-up">
          Доставка вкусной еды
        </h1>
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-display mb-6 animate-fade-up">
            {searchQuery ? "Результаты поиска" : "Популярные рестораны"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
          {filteredRestaurants.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              Ресторанов не найдено
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;