import firebase from 'firebase';
import * as types from '../constants';

const ref = firebase.database().ref('/todo/');

export function fetchList() {
    return function (dispatch) {
        ref.once('value', snapshot => {
            const payload = Object.values(snapshot.val());
            dispatch({ type: types.FETCH_LIST,
                payload,
            });
        });
    };
}

export function pushItem(title) {
    return function (dispatch) {
        const newTodo = ref.push();
        const data = { title, id: newTodo.key, status: false };
        newTodo.set(data);
        dispatch({
            type: types.PUSH_ITEM,
            payload: data,
        });
    };
}

export function editItem(payload) {
    return function (dispatch) {
        ref.child(payload.id).update(payload);
        dispatch({
            type: types.EDIT_ITEM,
            payload,
        });
    };
}

export function deleteItem(id) {
    return function (dispatch) {
        ref.child(id).remove();
        dispatch({
            type: types.DELETE_ITEM,
            payload: id,
        });
    };
}

export function selectAll(status) {
    return function (dispatch) {
        dispatch({
            type: types.SELECT_ALL,
            payload: status,
        });
    };
}

export function checkItem(id, status) {
    return function (dispatch) {
        ref.child(id).update({ status: !status });
        dispatch({
            type: types.CHECK_ITEM,
            payload: id,
        });
    };
}

export function deleteAll() {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_ALL,
        });
    };
}

