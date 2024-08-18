"use client"; // cart-item.tsx
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Image, { StaticImageData } from "next/image";

interface CartItemProps {
  data: {
    id: number;
    productName: string;
    price: number;
    productImage: string | StaticImageData; // Adjust type
  };
}

export const CartItem: React.FC<CartItemProps> = (props) => {
  const { id, productName, price, productImage } = props.data;

  // @ts-ignore

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const imageSrc =
    typeof productImage === "string"
      ? productImage
      : (productImage as StaticImageData).src;

  return (
    <div className="cartItem">
      <Image src={imageSrc} height={100} width={100} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            type="number"
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
