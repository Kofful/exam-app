import ACTION from '../actions/actionType'

const initialState = {
    projects: [],
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.PROJECTS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            };
        }
        case ACTION.PROJECTS_RESPONSE: {
            return {
                ...state,
                projects: action.projects,
                isFetching: false,
                error: null
            };
        }
        case ACTION.ONE_PROJECT_RESPONSE: {
            const projects = [...state.projects];
            const index = projects.findIndex((p) => p._id === action.project._id);
            if (index === -1) {
                projects.push(action.project);
            } else {
                projects[index] = action.project;
            }
            return {
                ...state,
                projects,
                error: null,
                isFetching: false
            };
        }
        case ACTION.PROJECTS_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}