import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopingContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <div className="text-center py-8 text-3xl">
      <div className="inline-flex gap-2 items-center mb-3">
        <Title text1="LATEST" text2="COLLECTIONS" />
      </div>
      <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        You must be the change you wish to see in the world.
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
