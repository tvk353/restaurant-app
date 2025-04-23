import { MenuItem as MenuItemType } from "@/types/item";
import { useCart } from "@/context/CartContext";

export default function MenuItem({ item }: { item: MenuItemType }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find((i) => i.id === item.id);

  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:scale-[1.02] transition">
      {/* <img
        src={item.image}
        alt={item.name}
        className="rounded-xl h-40 w-full object-cover mb-4"
      /> */}
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-gray-500 text-sm">{item.description}</p>
      <div className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</div>

      {cartItem ? (
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-gray-200 px-3 py-1 rounded text-xl hover:bg-gray-300"
          >
            -
          </button>
          <span className="font-bold text-lg">{cartItem.quantity}</span>
          <button
            onClick={() => addToCart(item)}
            className="bg-gray-200 px-3 py-1 rounded text-xl hover:bg-gray-300"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(item)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
