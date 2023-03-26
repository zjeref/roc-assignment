import { createContext } from "react";

export const ProductContext = createContext();

export const initialState = {
    products: [],
    query: {

    },
    category: "all",

    cart: {

    },

    user: {

    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_product": {
            return {
                ...state,
                products: action.payload
            }
        }
        case "set_query": {
            return {
                ...state,
                query: action.payload,
                options: {
                    pagination:"true"
                }
            }
        }
        case "set_category": {
            return {
                ...state,
                category: action.payload
            }
        }

        case "set_cart": {
            return {
                ...state,
                cart: action.payload
            }
        }

        case "set_user": {
            return {
                ...state,
                user: action.payload
            }
        }

        default: {
            return
        }
    }
}