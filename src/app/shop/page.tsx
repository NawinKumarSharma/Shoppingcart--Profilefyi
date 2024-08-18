// Ensure correct imports in `Shop.tsx`
import React from 'react';
import { PRODUCTS } from '@/Data/products';
import './shop.css';
import { Product } from '@/components/product/product';

 const Shop: React.FC = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Ecommerce Shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
export default Shop;