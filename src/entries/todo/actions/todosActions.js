import CryptoJS from 'crypto-js';
import * as types from '../constants';

export function checkItem(id) {
    return function (dispatch) {
        dispatch({
            type: types.CHECK_ITEM,
            payload: id,
        });
    };
}

export function fetchList() {
    return function (dispatch) {
        dispatch({
            type: types.FETCH_LIST,
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
            type: types.PUSH_ITEM,
            payload: {
                title,
                id: CryptoJS.lib.WordArray.random(256 / 16).toString(),
                status: false,
            },
        });
    };
}

export function editItem(payload) {
    return function (dispatch) {
        dispatch({
            type: types.PUSH_ITEM,
            payload,
        });
    };
}

export function deleteItem(id) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_ITEM,
            payload: id,
        });
    };
}
