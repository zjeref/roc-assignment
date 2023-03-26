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
                    pagination: "true"
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
        case "update_cart_quantity": {
            const { productId, quantity } = action.payload;
            const updatedCart = { ...state.cart };
            const productIndex = updatedCart.products.findIndex(
                (product) => product.productId === productId
            );
            if (productIndex >= 0) {
                updatedCart.products[productIndex].quantity = quantity;
            }
            return {
                ...state,
                cart: updatedCart,
            };
        }
        case "ADD_TO_CART": {
            const existingProductIndex = state.cart.products.findIndex(
                (product) => product.productId === action.payload.productId
            );

            if (existingProductIndex !== -1) {
                const updatedProducts = [...state.cart.products];
                updatedProducts[existingProductIndex] = {
                    productId: action.payload.productId,
                    quantity: updatedProducts[existingProductIndex].quantity + action.payload.quantity,
                };

                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        products: updatedProducts,
                    },
                };
            } else {
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        products: [
                            ...state.cart.products,
                            {
                                productId: action.payload.productId,
                                quantity: action.payload.quantity,
                            },
                        ],
                    },
                };
            }
        }
        default: {
            return
        }
    }
}