import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopingContext';
import { PageNotFound } from './PageNotFoun';
import { assets } from '../assets/frontend_assets/assets';
import Footer from '../components/Footer';
import axios from 'axios';
const Product = () => {
  const imageGenerator = 1 + Math.floor(52 * Math.random());
  const { id } = useParams();
  const { products } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === id);
    setProduct(foundProduct);
  }, [id, products]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
    } else {
      setError('');
      try {
        await axios.post('http://localhost:8080/api/v1/cart/add', {
          productId: product._id,
          productName: product.name,
          size: selectedSize,
          userEmail: localStorage.getItem('userEmail'), // Assuming you have user email in local storage
        });
        console.log(`Added ${product.name} of size ${selectedSize} to cart.`);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  if (!product) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product Thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={product.image[0]}
              alt="Main Product"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(4).fill(0).map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                alt="Star"
                className="w-3 h-3"
              />
            ))}
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">${product.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`border py-2 px-4 ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={handleAddToCart} // Call the add to cart handler
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
