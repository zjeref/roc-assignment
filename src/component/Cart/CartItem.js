import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../middlewares/global-state'
import { Link } from 'react-router-dom'

const CartItem = ({productItem}) => {
    const { dispatch } = useContext(ProductContext)
    const [product, setProduct] =useState(null);

    useEffect(()=> {
        setProduct(productItem);
    },[productItem])

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch({
            type: "update_cart_quantity",
            payload: {
                productId,
                quantity: newQuantity
            }
        });
    };

    const handleRemoveProduct = (productId) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: productId
        });
    };
    return (
        <>{product?
            <div key={product.id} className="border-b-2 p-4 flex flex-col sm:flex-row">
                <Link to={`/product/${product.id}`}>
                    <div className=' flex items-center justify-center h-full'>
                        <img src={product.image} alt={product.title} className="max-w-[14rem] md:min-w-[14rem] object-cover" />
                    </div>
                </Link>
                <div className="mx-10 py-5">
                    <Link to={`/product/${product.id}`}>
                        <h2 className="text-lg font-semibold mb-2">
                            {product.title}
                        </h2>
                    </Link>
                    <p className="text-gray-800 text-xl">${product.price}</p>
                    <div className="flex justify-center items-center w-min my-5">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-l"
                            onClick={() =>
                                handleQuantityChange(product.id, product.quantity - 1)
                            }
                            disabled={product.quantity <= 1}
                        >
                            -
                        </button>
                        <div className="mx-4">{product.quantity}</div>
                        <button
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r"
                            onClick={() =>
                                handleQuantityChange(product.id, product.quantity + 1)
                            }
                        >
                            +
                        </button>
                    </div>
                    <div className="text-lg space-x-2">
                        <button className="font-bold" onClick={() => alert("Comming SOON")}>Save for Later</button>
                        <button className="text-red-600 font-bold" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                    </div>
                </div>
            </div>:"Loading....."
            }
        </>
    )
}

export default CartItem
