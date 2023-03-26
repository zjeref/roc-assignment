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

    const total = cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0).toFixed(2);

    return (
        <div className='w-full flex flex-col md:flex-row justify-center my-6 bg-light md:space-x-4 px-4'>
            <div className='w-full max-w-2xl border-2 flex justify-between bg-white mb-4 shadow-lg '>
                {cartProducts.length > 0 ? (
                    <div className="transition-all ease-in-out delay-75">
                        {cartProducts.map((product) => (
                            <div key={product.id} className="border-b-2 p-4 flex">
                                <Link to={`/product/${product.id}`}>
                                    <div className='w-56'>
                                        <img src={product.image} alt={product.title} className="w-56 object-cover" />
                                    </div>
                                </Link>
                                <div className="mx-10 py-5">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {product.title}
                                    </h2>
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
                                        <button className="font-bold">Save for Later</button>
                                        <button className="text-red-600 font-bold" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                ) : (
                    <div className='w-full'>
                        <p className='text-lg text-center'>Your cart is empty.</p>
                    </div>

                )}
            </div>
            <div className='w-full md:max-w-xs h-max flex justify-between'>
                <div className='w-full'>
                    <div className="text-center text-2xl flex justify-center py-5  bg-white">
                        <p>Total </p>
                        <p>{`: $${total}`}</p>
                    </div>
                    <div className="text-center text-2xl flex justify-center my-2 px-2">
                        <button className="btn bg-primary text-white rounded-sm">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
