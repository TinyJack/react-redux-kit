import * as types from '../constants';

const initialState = {
    data: [],
    select: false,
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

        case types.EDIT_ITEM:
            return { ...state,
                data: state.data.map(item => {
                    return item.id === action.payload.id ? { ...item, ...action.payload } : item;
                }) };

        case types.DELETE_ITEM:
            return { ...state, data: state.data.filter(elem => elem.id !== action.payload) };

        case types.DELETE_ALL:
            return { ...state, data: [], select: false };

        case types.SET_SELECT:
            return { ...state, select: state.data.every(item => item.status) };

        case types.SELECT_ALL:
            return { ...state,
                data: state.data.map(elem => {
                    const status = { status: !state.select };
                    return { ...elem, ...status };
                }),
            };

        default:
            return state;
    }
}
