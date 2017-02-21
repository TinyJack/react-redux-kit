import CryptoJS from 'crypto-js';
import { CHECK_ITEM, FETCH_LIST, PUSH_ITEM } from '../constants';

export function checkItem(id) {
    return function (dispatch) {
        dispatch({
            type: CHECK_ITEM,
            payload: id,
        });
    };
}

export function fetchList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_LIST,
            payload: [{
                id: 1,
                status: false,
                title: '1',
            }, {
                id: 2,
                status: false,
                title: '2',
            }],
        });
    };
}

export function pushItem(title) {
    return function (dispatch) {
        dispatch({
            type: PUSH_ITEM,
            payload: {
                title,
                id: CryptoJS.lib.WordArray.random(256 / 16).toString(),
                status: false,
            },
        });
    };
}
