import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from '../reducer/ProductReducer'

const Appcontext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featuredProducts: [],
    isSinglLoading: false,
    SingleProduct: [],
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const getProducts = async (url) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await axios.get(url);
            // console.log(res);
            const products = await res.data;
            dispatch({ type: 'SET_API_DATA', payload: products });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_ERROR' });
        }
    }
  
    const getSingleProduct = async (url) => {
        dispatch({ type: 'SET_SINGLE_LOADING' });
        try {
            const res = await axios.get(url);
            // console.log(res);
            const singleProduct = await res.data;
            dispatch({ type: 'SET_SINGLE_API_DATA', payload: singleProduct });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_SINGLE_ERROR' });
        }
    }




    useEffect(() => {
        getProducts(API);
    }, [])




    return (
        <Appcontext.Provider value={{ ...state, getSingleProduct }}>{children}</Appcontext.Provider>
    )
}

const useProductContext = () => {
    return useContext(Appcontext);
}


export { AppProvider, Appcontext, useProductContext };