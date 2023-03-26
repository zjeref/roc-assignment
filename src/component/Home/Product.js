import React, { useEffect, useState, useContext } from 'react';


import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../middlewares/global-state';

const Product = ({ product }) => {
    const navigate = useNavigate();
    const [currentProduct, setcurrentProduct] = useState(null);
    const { dispatch } = useContext(ProductContext);

    useEffect(() => {
        setcurrentProduct(product);
    }, [product]);

    const handleNavigate = () => {
        navigate(`/product/${currentProduct.id}`);
    };

    const handleAddToCart = (e) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                productId: currentProduct.id,
                quantity: 1,
            },
        });
        navigate('/cart')
        e.stopPropagation();
    };

    return (
        <>
            {currentProduct ? (
                <div className="w-full sm:w-72 sm:h-96  border border-gray-200 bg-white rounded-md overflow-hidden shadow-md cursor-pointer select-none hover:shadow-lg" onClick={(e)=>handleNavigate(e)}>
                    <div className="h-56 overflow-hidden p-2">
                        <img src={currentProduct.image} alt={currentProduct.title} className="object-fill w-full h-full" />
                    </div>
                    <div className="px-4 py-2">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">{currentProduct.title}</h2>
                        <p className="text-gray-500 text-sm my-1 truncate">{currentProduct.description}</p>
                        <p className="text-gray-600 text-base font-medium">${currentProduct.price}</p>
                    </div>
                    <div className="flex justify-center py-2">
                        <button className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={handleAddToCart}>
                            Add to Cart
                        </button>

                    </div>
                    
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default Product;
