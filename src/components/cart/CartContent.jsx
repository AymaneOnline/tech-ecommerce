import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function CartContent() {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="p-4">Your cart is empty</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
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
            <p className="font-semibold">${item.price * item.quantity}</p>

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

      {/* Total */}
      <div className="mt-4 border-t pt-4">
        <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>

        <Button className="w-full mt-3">Checkout</Button>
      </div>
    </div>
  );
}
