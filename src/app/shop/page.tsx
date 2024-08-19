// Ensure correct imports in `Shop.tsx`
import React from "react";
import { PRODUCTS } from "@/Data/products";
import "./shop.css";
import { Product } from "@/components/product/product";

const Shop: React.FC = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1 className="mb-9">Ecommerce Shop</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
export default Shop;
