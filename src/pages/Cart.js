import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../middlewares/global-state'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { data, dispatch } = useContext(ProductContext)
    const [currentCart, setCurrentCart] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        setCurrentCart(data.cart)
    }, [data.cart])

    useEffect(() => {
        const fetchCartProducts = async () => {
            const products = await Promise.all(
                currentCart?.products?.map(async (product) => {
                    const response = await fetch(
                        `https://fakestoreapi.com/products/${product.productId}`
                    );
                    const data = await response.json();
                    return {
                        ...data,
                        quantity: product.quantity,
                    };
                }) || []
            );
            setCartProducts(products);
        };
        fetchCartProducts();
    }, [currentCart]);

    return (
        <div className='w-full flex justify-center my-6 bg-light'>
            <div className='w-full max-w-7xl border-2 flex justify-between bg-white mb-4 shadow-lg'>
                    {cartProducts.length > 0 ? (
                        <div className="">
                            {cartProducts.map((product) => (
                                <div key={product.id} className="border-b-2 p-4 flex">
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-56 object-cover"
                                        />
                                    </Link>
                                    <div className="mx-10 py-5">
                                        <h2 className="text-lg font-semibold text-center mb-2">
                                            {product.title}
                                        </h2>
                                        <p className="text-gray-800 text-xl">${product.price}</p>
                                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
            </div>
            <div>

            </div>
        </div>
    )
}

export default Cart
