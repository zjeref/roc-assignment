import React, { useEffect, useState } from 'react'
import Category from './Category';
import axios from 'axios'

const Categories = () => {
    const [category, setCategory] = useState(null);


    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/categories")
            .then(res => {
                setCategory(res.data)
            })
    }, [])



    return (
        <div className="w-full  flex justify-center my-4">
            <div className="space-x-4 flex max-w-6xl">
                <Category key="all" category={"all"} />
                {category?.map(cat => {
                    return <Category key={cat} category={cat} />
                })}
            </div>
        </div>
    )
}



export default Categories
