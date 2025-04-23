import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);// Replace with your Stripe publishable key

export default function Checkout() {
  const { cart } = useCart();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Create a payment session on the server
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const session = await res.json();
    console.log("Stripe session response:", session); // 🔍 Add this

if (!session.id) {
  console.error("No session ID returned from backend.");
  return;
}

    // Redirect to Stripe checkout
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <div className="text-lg font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
