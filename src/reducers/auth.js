import * as ACCTION from "../const/action-types";

const initState = {
    isLoading: false,
    isSuccess: false,
    email: undefined,
    name: undefined,
    phone: undefined,
    token: undefined,
    dataLogin:{}
};

export default (state = initState, action) => {
    const { type, payload, err } = action;
    
    switch (type) {
        //LOGIN
        case ACCTION.LOGIN:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
            };
        case ACCTION.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                dataLogin: payload.data.data
            }
        case ACCTION.LOGIN_FALSE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                error: err
            }
        //LOGOUT_SYSTEM
        case ACCTION.LOGOUT_SYSTEM:
            return {
                ...initState
            };
        default:
            return state;
    }
}