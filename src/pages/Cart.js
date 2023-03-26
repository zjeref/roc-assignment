import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../middlewares/global-state'
import { Link } from 'react-router-dom'
import Checkout from '../component/Cart/Checkout'
import CartItem from '../component/Cart/CartItem'

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
                            <CartItem key={product.id} item={product.id} productItem={product} />
                        ))}
                    </div>
                ) : (
                    <div className='w-full'>
                        <p className='text-lg text-center'>Your cart is empty.</p>
                    </div>

                )}
            </div>
            <Checkout total={total} />
        </div>
    )
}

export default Cart
