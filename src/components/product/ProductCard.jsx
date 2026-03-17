import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full object-cover"
      />

      <CardHeader>
        <CardTitle className="text-lg">{product.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Badge variant="secondary">{product.category}</Badge>

        <p className="text-xl font-bold">${product.price}</p>

        <Link to={`/products/${product.id}`}>
          <Button className="w-full">View Product</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
