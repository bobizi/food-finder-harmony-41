import { useParams } from "react-router-dom";
import { Star, Clock, Wallet, ShoppingCart } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuItemDialog from "@/components/MenuItemDialog";
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

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
      {
        id: 1,
        name: "Пицца Маргарита",
        price: "599 ₽",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        description: "Классическая итальянская пицца с томатным соусом, моцареллой и базиликом",
        ingredients: ["Томатный соус", "Моцарелла", "Базилик", "Оливковое масло"]
      },
      {
        id: 2,
        name: "Паста Карбонара",
        price: "499 ₽",
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df",
        description: "Спагетти с соусом из яиц, сыра пекорино романо, гуанчале и черного перца",
        ingredients: ["Спагетти", "Яйца", "Пекорино романо", "Гуанчале", "Черный перец"]
      },
      {
        id: 3,
        name: "Тирамису",
        price: "299 ₽",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
        description: "Классический итальянский десерт с кофейным вкусом",
        ingredients: ["Савоярди", "Маскарпоне", "Кофе", "Какао"]
      },
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
  const { toast } = useToast();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  const [cart, setCart] = useState<CartItem[]>([]);

  if (!restaurant) {
    return <div className="container px-4 py-8">Ресторан не найден</div>;
  }

  const addToCart = (item: { id: number; name: string; price: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: `${item.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return sum + price * item.quantity;
  }, 0);

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
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Корзина пуста</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full border flex items-center justify-center"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full border flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Итого:</span>
                          <span className="font-medium">{totalPrice} ₽</span>
                        </div>
                        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                          Оформить заказ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-display mb-4">Меню</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurant.menu.map((item) => (
              <MenuItemDialog
                key={item.id}
                item={item}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
