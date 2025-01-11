import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  ingredients?: string[];
}

interface MenuItemDialogProps {
  item: MenuItem | null;
  onAddToCart: () => void;
}

const MenuItemDialog = ({ item, onAddToCart }: MenuItemDialogProps) => {
  if (!item) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="glass-card rounded-lg overflow-hidden cursor-pointer">
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            {item.description || "Описание отсутствует"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {item.ingredients && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Состав:</h4>
              <ul className="list-disc list-inside">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-primary">{item.price}</span>
            <button
              onClick={onAddToCart}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;