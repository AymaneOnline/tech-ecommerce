import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function CartContent({ closeCart }) {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return <p className="p-4">Your cart is empty</p>;
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Scrollable area */}
      <div className="flex-1 p-4 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.thumbnail}
              className="h-16 w-16 rounded-md object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{item.title}</p>

              <div className="flex items-center gap-2 mt-2">
                <Button size="sm" onClick={() => decreaseQty(item.id)}>
                  -
                </Button>

                <span>{item.quantity}</span>

                <Button size="sm" onClick={() => increaseQty(item.id)}>
                  +
                </Button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed footer */}
      <div className="border-t p-4">
        <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>

        <Button className="w-full mt-3" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
