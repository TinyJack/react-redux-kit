import { CHECK_ITEM, FETCH_LIST, PUSH_ITEM } from '../constants';

const initialState = {
    data: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHECK_ITEM:
            return {
                ...state,
                data: state.data.reduce((result, item) => {
                    result.push({
                        ...item,
                        status: item.id === action.payload ? !item.status : item.status,
                    });
                    return result;
                }, []) };

        case FETCH_LIST:
            return { ...state, data: action.payload };

        case PUSH_ITEM:
            return { ...state, data: [action.payload].concat(state.data) };

        default:
            return state;
    }
}
