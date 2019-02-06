import {takeLatest} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import * as userSaga from "./userSaga";
import * as projectSaga from "./projectSaga";
import * as currentUserSaga from "./currentUserSaga";

function* rootSaga() {
    yield takeLatest(ACTION.FETCH_ALL_USERS, userSaga.fetchAllUsers);
    yield takeLatest(ACTION.FETCH_USER_BY_ID, userSaga.fetchUserById);
    yield takeLatest(ACTION.CREATE_ACCOUNT, currentUserSaga.createAccount);
    yield takeLatest(ACTION.DELETE_USER, userSaga.deleteUser);

    yield takeLatest(ACTION.FETCH_ALL_PROJECTS, projectSaga.fetchAllProjects);
    yield takeLatest(ACTION.FETCH_PROJECT_BY_ID, projectSaga.fetchProjectById);
}

export default rootSaga;
