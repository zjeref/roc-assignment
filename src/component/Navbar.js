import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductContext } from '../middlewares/global-state';
import { AiOutlineShoppingCart, AiOutlineShop } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'



const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentCart, setCurrentCart] = useState(null)
    const { data, dispatch } = useContext(ProductContext);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/users/1`)
            .then(res => {
                setCurrentUser(res.data)
                dispatch({ type: 'set_user', payload: res.data })
            })
            .catch(err => console.error(err))

        axios.get(`https://fakestoreapi.com/carts/2`)
            .then(res => {
                dispatch({ type: 'set_cart', payload: res.data })
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(()=> {
        setCurrentCart(data.cart)
    },[data.cart])

    // console.log(currentCart.products.length)

    return (
        <div className="w-full bg-primary flex justify-center text-white">
            <div className="w-full flex justify-between items-center max-w-7xl px-4 py-2">
                <div className="text-5xl">
                    <Link to='/'>
                        <AiOutlineShop />
                    </Link>
                </div>
                <div className=" text-semiwhite flex space-x-4 text-xl">
                    <div className="flex items-center space-x-6 font-semibold ">
                        {currentUser ?
                            <>
                                <Link to={`/cart/`}>
                                    <div className='flex space-x-2 cursor-pointer hover:underline'>
                                        <div className='text-2xl'>
                                            <AiOutlineShoppingCart />
                                        </div>
                                        <div className='text-xl'>
                                            <span>Cart</span>
                                        </div>
                                        <div className='text-xl'>
                                            {currentCart?
                                                <span>({currentCart?.products?.length})</span>:""
                                            }
                                        </div>
                                    </div>
                                </Link>
                                <div className='flex space-x-2 cursor-pointer hover:underline'>
                                    <div className='text-2xl'>
                                        <FaUserCircle />
                                    </div>
                                    <div className='text-xl'>
                                        <span>{currentUser.name.firstname}</span>
                                    </div>
                                </div>
                            </>
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar