import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const params = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${params.id}`)
      .then(res => setCurrentProduct(res.data))
      .catch(err => console.log(err))
  }, [params.id])


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }
    if (rating - fullStars >= 0.5) {
      stars.push(<BsStarHalf key={stars.length} />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={stars.length} />);
    }
    return stars;
  }

  return (
    <>{currentProduct ?
      <div className='w-full flex justify-center my-6 bg-light'>
        <div className='w-full max-w-7xl border-2 flex justify-between bg-white mb-4 shadow-lg'>
          <div className='w-5/12 p-4 text-center'>
            <div className='border-2 p-4'>
              <img src={currentProduct.image} alt="" className='max-h-[80vh]' />
            </div>

          </div>
          <div className='w-7/12 flex flex-col  p-4 space-y-4'>
            <div>
              <h1 className="text-3xl font-bold">{currentProduct.title}</h1>
            </div>
            <div className='pr-4'>
              <p className='text-xl text-slate-500'>{currentProduct.description}</p>
            </div>
            <div className='flex space-x-4'>
              <div className='flex space-x-2 text-yellow-600 items-center'>
                {renderStars(currentProduct.rating.rate)}
                <p>{currentProduct.rating.rate}</p>
              </div>
              <p>({currentProduct.rating.count})</p>
            </div>
            <div>
              <p className='text-2xl'>${currentProduct.price}</p>
            </div>
            <div className="space-x-3 mt-4">
              <button className='bg-primary text-white btn'>Add to Cart</button>
              <button className='bg-light text-black btn'>Buy Now</button>
            </div>
          </div>
        </div>
      </div> :
      ""
    }
    </>
  )
}

export default ProductPage
