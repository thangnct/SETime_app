import * as ACCTION from "../const/action-types";

const initState = {
    isLoading: false,
    isSuccess: false,
    email: undefined,
    fullName: undefined,
    phone: undefined,
    token: undefined,
    dataLogin: {},
    dataRegister: {},
    dataCheckAccountExists: {}
};

export default (state = initState, action) => {
    const { type, payload, err } = action;

    switch (type) {
        //CHECK_ACCOUNT_EXISTS
        case ACCTION.CHECK_ACCOUNT_EXISTS:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                dataLogin: {},
                dataRegister: {}
            };
        case ACCTION.CHECK_ACCOUNT_EXISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                dataCheckAccountExists: payload.data.data
            }
        case ACCTION.CHECK_ACCOUNT_EXISTS_FALSE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                error: err
            }
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
                dataLogin: payload.data.data,
                token: payload.data.data.token,
                fullName: payload.data.data.code == 1 ? payload.data.data.user.fullName : null,
                phone: payload.data.data.code == 1 ? payload.data.data.user.phone : null,
            }
        case ACCTION.LOGIN_FALSE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                error: err
            }
        //REGISTER
        case ACCTION.REGISTER:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                dataLogin: {}
            };
        case ACCTION.REGISTER_SUCCESS:
            console.log("???: ", payload.data)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                dataRegister: payload.data.data,

            }
        case ACCTION.REGISTER_FALSE:
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