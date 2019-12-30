import * as ACCTION from "../const/action-types";

const initState = {
    email: undefined,
    name: undefined,
    phone: undefined,
    token: undefined,
    dataLoginWithFirebase: {}
};

export default (state = initState, action) => {
    const { type, payload, err } = action;
    switch (type) {
        //LOGOUT_SYSTEM
        case ACCTION.LOGOUT_SYSTEM:
            return {
                ...initState
            };
        case ACCTION.LOGIN:
            return{
                ...state
            }
        default:
            return state;
    }
}