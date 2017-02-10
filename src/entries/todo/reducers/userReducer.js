import { SET_USER } from '../constants'

const initialState = {
    name: '',
    email: '',
    icon: '',
    id: '',
    name: '',
    token: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}
