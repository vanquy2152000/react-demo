export const FETCH_USER_LOGIN_SUSSCESS = 'FETCH_USER_LOGIN_SUSSCESS';
export const USER_LOGOUT_SUSSCESS = 'USER_LOGOUT_SUSSCESS';


export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUSSCESS,
        payload: data
    };
};

export const doLogOut = () => {
    return {
        type: USER_LOGOUT_SUSSCESS
    }
}
