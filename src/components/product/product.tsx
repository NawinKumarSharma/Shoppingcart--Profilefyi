'use client'
import React, { useContext } from "react";
import { ShopContext } from "@/context/shop-context";
import {
  CardContent,
  Card,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface ProductProps {
  data: {
    id: number;
    productName: string;
    price: number;
    productImage: string | StaticImageData;
  };
}

export const Product: React.FC<ProductProps> = ({ data }) => {
  const { id, productName, price, productImage } = data;
  const context = useContext(ShopContext);
  console.log(context);

  if (!context) {
    throw new Error(
      "ShopContext is not available. Make sure you are using ShopContextProvider."
    );
  }

  const { addToCart, cartItems } = context;
  const cartItemCount = cartItems[id] || 0;

  return (
    <Card className="rounded-none grid items-center h-full">
      <CardHeader className="bg-gray-50 aspect-1/85 items-center justify-center p-0">
        <figure className="h-full">
          <Image
            src={productImage}
            width={200}
            height={200}
            alt={productName}
            className="brightness-[0.98] w-full h-full object-scale-down p-6"
          />
        </figure>
      </CardHeader>
      <CardContent className="md:p-4 md:pb-0 p-2 pb-0">
        <p>{productName}</p>
        <div className="flex items-center py-2 gap-1">
          <span className="font-medium">${price}</span>
        </div>
      </CardContent>
      <CardFooter className="md:p-4 md:pt-0 p-2 pt-0">
        <Button
          className="border w-full h-10 rounded-none"
          onClick={() => addToCart(id)}
        >
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </Button>
      </CardFooter>
    </Card>
  );
};
