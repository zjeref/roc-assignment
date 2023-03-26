import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../middlewares/global-state';
import Product from './Product';

const ProductList = () => {
  const { data } = useContext(ProductContext);
  const [currentData, setCurrentData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [clearedSearch, setClearedSearch] = useState(false);

  useEffect(() => {
    setCurrentData(data.products);
  }, [data.products]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setClearedSearch(!query);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products${searchQuery ? `?title=${searchQuery}` : ''}`);
      const data = await response.json();
      setCurrentData(data);
    };
    fetchData();
  }, [searchQuery, clearedSearch]);

  return (
    <div className="w-full flex justify-center bg-light my-6">
      <div className="max-w-[1440] grid grid-cols-5 gap-8 p-6">
        <div className="col-span-5 mb-4">
          <input
            type="text"
            placeholder="Search products by title"
            className="w-full h-10 border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {currentData?.length > 0 ? (
          currentData.map((data) => {
            return <Product key={data.id} product={data} />;
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
