import ACTION from "../actions/actionType";

const initialState = {
    currentUser: [],
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CURRENT_USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            };
        }
        case ACTION.CURRENT_USER_RESPONSE: {
            return {
                ...state,
                currentUser: action.currentUser,
                error: null,
                isFetching: false
            };
        }
        case ACTION.CURRENT_USER_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        }
        default: {
            return state;
        }
    }
}
