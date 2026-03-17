import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          TechStore
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products">Products</Link>
          <Link to="/cart">
            <Button>Cart</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
