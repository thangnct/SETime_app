import * as ACCTION from "../const/action-types";

const initState = {
    isLoading: false,
    isSuccess: false,
    email: undefined,
    name: undefined,
    phone: undefined,
    token: undefined,
    dataLogin: {},
    dataRegister: {},
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