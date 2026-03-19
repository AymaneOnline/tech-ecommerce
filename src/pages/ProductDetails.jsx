import { useParams } from "react-router";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore } from "@/store/cartStore";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Star, ShoppingCart, Package } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id);

  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) {
    return (
      <div className="grid gap-10 md:grid-cols-2">
        <Skeleton className="h-100 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    );
  }

  if (error) return <p>Something went wrong</p>;

  const product = data;

  const images = product.images?.length ? product.images : [product.thumbnail];

  const currentImage = selectedImage || images[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* 🖼️ IMAGE GALLERY */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="overflow-hidden rounded-2xl border">
            <img
              src={currentImage}
              alt={product.title}
              className="h-100 w-full object-cover transition duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 overflow-hidden rounded-lg border transition ${
                  currentImage === img
                    ? "ring-2 ring-primary"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 📄 PRODUCT INFO */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Price */}
          <p className="text-2xl font-semibold">
            ${product.price.toLocaleString()}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-current" />
            <span>{product.rating} / 5</span>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{product.stock} items in stock</span>
          </div>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground">{product.description}</p>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="flex items-center gap-2 w-full md:w-fit transition active:scale-95"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
