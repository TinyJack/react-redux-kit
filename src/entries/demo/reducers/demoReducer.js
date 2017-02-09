import { SET_NAME } from '../constants'

const initialState = {
    name: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_NAME:
            return {...state, name: action.payload};

        default:
            return state;
    }
}
