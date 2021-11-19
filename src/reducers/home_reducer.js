import { homePageConstants } from "../actions/constants"

const initState = {
    carousell:{},
    products:[],
    loading: false,
    error: null
}


export default (state = initState, action) => {
    console.log("jack test")
    switch (action.type) {
        case homePageConstants.GET_ALL_HOMEPAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case homePageConstants.GET_ALL_HOMEPAGE_SUCCESS:
            console.log(action.payload.homepages)
            state = {
                ...state,
                carousell: action.payload.carousell,
                products: action.payload.products,
                loading: false
            }
            break;
        case homePageConstants.GET_ALL_HOMEPAGE_FAILURE:
            state = {
                ...initState,
                loading: false
            }
            break;
    }
    return state;
}