import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products-context';

import './shop.scss';
import ProductCard from '../../components/product-card';

const Shop = () => {
  const { products } = useContext(ProductsContext)
  return (
    <div className='products-container'>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Shop;