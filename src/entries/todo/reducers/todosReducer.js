import * as types from '../constants';

const initialState = {
    data: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.CHECK_ITEM:
            return {
                ...state,
                data: state.data.reduce((result, item) => {
                    result.push({
                        ...item,
                        status: item.id === action.payload ? !item.status : item.status,
                    });
                    return result;
                }, []) };

        case types.FETCH_LIST:
            return { ...state, data: action.payload };

        case types.PUSH_ITEM:
            return { ...state, data: [action.payload].concat(state.data) };

        case types.DELETE_ITEM:
            return { ...state, data: state.data.filter(elem => elem.id !== action.payload) };

        default:
            return state;
    }
}
