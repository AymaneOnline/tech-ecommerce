import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function CartContent() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

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
            <p className="text-sm text-muted-foreground">
              Qty: {item.quantity}
            </p>
          </div>

          <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
