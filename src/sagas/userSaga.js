import {put} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import {deleteUserById, getAllUsers, getUserById} from "../api/rest/restController";


export function* fetchAllUsers() {
    yield put({type: ACTION.USERS_REQUEST});
    try {
        const {data} = yield getAllUsers();
        yield put({type: ACTION.USERS_RESPONSE, users: data});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e});
    }
}

//в качестве парраметра приходит action
export function* fetchUserById({id}) {
    yield put({type: ACTION.USERS_REQUEST});
    try {
        const {data} = yield getUserById(id);
        yield put({type: ACTION.ONE_USER_RESPONSE, user: data});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e});
    }
}

export function* deleteUser({user, history}) {
    yield put({type: ACTION.DELETE_USER_REQUEST, user});
    try {
        yield deleteUserById(user._id);
        history.push("/users");
    } catch (e) {
        yield put({type: ACTION.DELETE_USER_ERROR, user});
    }
}

