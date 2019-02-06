import {put} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import {registration} from "../api/rest/restController";


export function* createAccount({createAccountData}) {
    yield put({type: ACTION.CURRENT_USER_REQUEST});
    try {
        const {data} = yield registration(createAccountData);
        yield put({type: ACTION.CURRENT_USER_RESPONSE, currentUser: data});
    } catch (e) {
        yield put({type: ACTION.CURRENT_USER_ERROR, error: e});
    }
}