import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartContent from "@/components/cart/CartContent";
import ThemeToggle from "@/components/theme/ThemeToggle";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          TechStore
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/products">Products</Link>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button>Cart ({cart.length})</Button>
            </SheetTrigger>

            <SheetContent>
              <CartContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
