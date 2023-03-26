import { useEffect, useReducer } from 'react'
import { Routes, BrowserRouter, Route } from "react-router-dom"
import axios from 'axios';

import { ProductContext, initialState, reducer } from './middlewares/global-state'

import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';

function App() {
  const [data, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {

    if (data.category === "all") {
      axios.get(`https://fakestoreapi.com/products`)
        .then(res => dispatch({ type: "set_product", payload: res.data }))
        .catch(err => console.log(err))
    } else {
      axios.get(`https://fakestoreapi.com/products/category/${data.category}`)
        .then(res => dispatch({ type: "set_product", payload: res.data }))
        .catch(err => console.log(err))
    }


  }, [data.category]);


  return (
    <BrowserRouter >
      <ProductContext.Provider value={{ data: data, dispatch: dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </ProductContext.Provider>
    </BrowserRouter>
  );
}

export default App;
