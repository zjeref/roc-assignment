import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../middlewares/global-state'
import Product from './Product';

const ProductList = () => {
  const { data} = useContext(ProductContext);
  const [currentData, setcurrentData] = useState(null)
  useEffect(() => {
    setcurrentData(data.products);
  }, [data.products])

  return (
    <div className="w-full flex justify-center bg-light my-6">
      <div className="max-w-[1440] grid grid-cols-5 gap-8 p-6 ">
        {currentData?.length > 0 ?
          currentData.map(data => {
            return <Product key={data.id} product={data} />
          }) :
          ""
        }
      </div>
    </div>
  )
}

export default ProductList
