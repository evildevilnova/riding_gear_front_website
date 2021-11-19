import axios from "../helpers/axios";
import { homePageConstants } from './constants';


export const gethomepage = () => {
    return async dispatch => {

        dispatch({ type: homePageConstants.GET_ALL_HOMEPAGE_REQUEST });

        const  res = await axios.get('/homepage');
        // console.log(res);

        if(res.status === 200){

            const {carousell, products} = res.data;
            console.log("res")
            console.log(carousell)
            dispatch({
                type: homePageConstants.GET_ALL_HOMEPAGE_SUCCESS,
                payload: { carousell,products }
            });
        }else{
            dispatch({
                type: homePageConstants.GET_ALL_HOMEPAGE_FAILURE,
                payload: {
                    error: res.data.error
                }
            });
        }
    }
}
