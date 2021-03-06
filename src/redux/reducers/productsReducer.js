import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from '../actions/types';

const productsReducer = (prevState = null, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return prevState;
        case FETCH_PRODUCTS_SUCCESS:
            return action.products;
        case FETCH_PRODUCTS_FAILURE:
            return prevState;
        default:
            return prevState;
    }
};

export default productsReducer;
