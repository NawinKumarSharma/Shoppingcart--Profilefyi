"use client";
import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "@/Data/products";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// const { ShopContext } = dynamic(() => import("../../context/shop-context"), {
//   ssr: false,
// });
const Cart = () => {
  // @ts-ignore

  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const [cartItemsx,setcartItems] = useState(()=>{
    return cartItems
  })
  const totalAmount = getTotalCartAmount();

  const router = useRouter();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>

      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItemsx[product.id] !== 0) {
            return <CartItem data={product} key={product.id} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <Button className="" onClick={() => router.push("/")}>
            {" "}
            Continue Shopping{" "}
          </Button>
          <Button
            onClick={() => {
              checkout();
              router.push("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </Button>
        </div>
      ) : (
        <h1 className="text-red-700 text-xl mt-5">
          {" "}
          Your Shopping Cart is Empty
        </h1>
      )}
    </div>
  );
};
export default Cart;
