import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopingContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const [filters, setFilters] = useState({
    men: false,
    women: false,
    kids: false,
    types: {
      topwear: false,
      bottomwear: false,
      winterwear: false,
    },
  });

  const [showFilters, setShowFilters] = useState(true);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name in filters) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        types: {
          ...prevFilters.types,
          [name]: checked,
        },
      }));
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        (filters.men && product.category === 'Men') ||
        (filters.women && product.category === 'Women') ||
        (filters.kids && product.category === 'Kids');

      const matchesType =
        (filters.types.topwear && product.type === 'Topwear') ||
        (filters.types.bottomwear && product.type === 'Bottomwear') ||
        (filters.types.winterwear && product.type === 'Winterwear');

      return (matchesCategory || filters.men || filters.women || filters.kids) &&
        (matchesType || filters.types.topwear || filters.types.bottomwear || filters.types.winterwear);
    });

    // Sort filtered products
    if (sortOption === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Set the filtered products, or default to the first 8 products if no filters match
    setFilterProducts(filtered.length > 0 ? filtered : products.slice(0, 8));
  }, [products, filters, sortOption]);

  // Initialize default products with sorting applied
  useEffect(() => {
    if (products.length > 0) {
      let defaultProducts = products.slice(0, 8);
      if (sortOption === 'low-high') {
        defaultProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'high-low') {
        defaultProducts.sort((a, b) => b.price - a.price);
      }
      setFilterProducts(defaultProducts);
    }
  }, [products, sortOption]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p onClick={() => setShowFilters((prev) => !prev)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
        </p>
        <img className="h-3 sm:hidden" src={assets.dropdown_icon} alt="" />

        {showFilters && ( // Show filters only if showFilters is true
          <>
            <div className="border border-gray-300 pl-5 py-3 mt-6 sm:block">
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    name="men"
                    checked={filters.men}
                    onChange={handleCheckboxChange}
                  /> Men
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    name="women"
                    checked={filters.women}
                    onChange={handleCheckboxChange}
                  /> Women
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    name="kids"
                    checked={filters.kids}
                    onChange={handleCheckboxChange}
                  /> Kids
                </label>
              </div>
            </div>

            <div className="border border-gray-300 pl-5 py-3 my-5 sm:block">
              <p className="mb-3 text-sm font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    name="topwear"
                    checked={filters.types.topwear}
                    onChange={handleCheckboxChange}
                  /> Topwear
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    name="bottomwear"
                    checked={filters.types.bottomwear}
                    onChange={handleCheckboxChange}
                  /> Bottomwear
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    name="winterwear"
                    checked={filters.types.winterwear}
                    onChange={handleCheckboxChange}
                  /> Winterwear
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem onClick key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
