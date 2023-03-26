import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../middlewares/global-state'
import Product from './Product';

const ProductList = () => {
  const { data } = useContext(ProductContext);
  const [currentData, setCurrentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCurrentData(data.products);
  }, [data.products])

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    if (currentData) {
      if (searchTerm === '') { // if the search term is empty
        setCurrentData(data.products); // show all the data again
      } else {
        const filteredData = currentData.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setCurrentData(filteredData);
      }
    }
  }, [searchTerm]);

  return (
    <div className="w-full flex flex-col items-center bg-light my-6">
      <div className="my-4 w-sm">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="text-xl">
        {data.category!=="all"?
          <p>Showing result of: {searchTerm ? `${searchTerm}` : `${data.category.charAt(0).toUpperCase() + data.category.slice(1)}`}</p>:""
        }
      </div>
      <div className="max-w-[1440] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-5 gap-8  p-6 ">
        {currentData?.length > 0 ?
          currentData.map(data => {
            return <Product key={data.id} product={data} />
          }) :
          <p>No products found.</p>
        }
      </div>
    </div>
  )
}

export default ProductList
