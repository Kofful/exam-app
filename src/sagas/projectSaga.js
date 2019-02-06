import {put} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import {getAllProjects, getProjectById} from "../api/rest/restController";

export function* fetchAllProjects() {
    yield put({type: ACTION.PROJECTS_REQUEST});
    try {
        const {data} = yield getAllProjects();
        yield put({type: ACTION.PROJECTS_RESPONSE, projects: data});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}

export function* fetchProjectById({id}) {
    yield put({type: ACTION.PROJECTS_REQUEST});
    try {
        const {data} = yield getProjectById(id);
        yield put({type: ACTION.ONE_PROJECT_RESPONSE, project: data});
    } catch(e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e})
    }
}