import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log(res);
            dispatch({ type: productConstants.GET_PRODUCTS_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCTS_PAGE_SUCCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data;

                dispatch({
                    type: productConstants.GET_PRODUCTS_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (e) {
            console.log(e);
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST });
        let res;

        try {
            const { productId } = payload.params;
            console.log(`getProductDetailsById === ${productId}`);
            res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCTS_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            })
        }

    }
}