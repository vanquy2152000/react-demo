
import { FETCH_USER_LOGIN_SUSSCESS, USER_LOGOUT_SUSSCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        email: '',
        refresh_token: '',
        username: '',
        role: '',
        image: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUSSCESS:

            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    email: action?.payload?.DT?.email,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                    image: action?.payload?.DT?.image
                },
                isAuthenticated: true
            };

        case USER_LOGOUT_SUSSCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    email: '',
                    refresh_token: '',
                    username: '',
                    role: '',
                    image: ''
                },
                isAuthenticated: false
            };
        default: return state;
    }
};

export default userReducer;