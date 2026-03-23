import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      ...form,
      items: cart,
      total,
    };

    console.log("ORDER:", order);

    alert("Order placed (mock)");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* LEFT: FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Customer Info</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <Button className="w-full mt-4">Place Order</Button>
      </form>

      {/* RIGHT: SUMMARY */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <div className="border-t mt-4 pt-4 font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
