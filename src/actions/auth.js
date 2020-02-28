import * as ACCTION from "../const/action-types";
import {
    LOGIN, REGISTER, CHECK_ACCOUNT_EXISTS
} from "../const/APIs"
import { convertDataToxUrlencoded } from "../commons";

export const check_account_exists = (data) => {
    // console.log("Login data: ", data)
    return ({
        types: [
            ACCTION.CHECK_ACCOUNT_EXISTS,
            ACCTION.CHECK_ACCOUNT_EXISTS_SUCCESS,
            ACCTION.CHECK_ACCOUNT_EXISTS_FALSE
        ],
        payload: {
            client: "default",
            request: {
                method: "POST",
                url: CHECK_ACCOUNT_EXISTS,
                data: convertDataToxUrlencoded(data)
            }
        }
    })
}

export const login = (data) => {
    console.log("Login data: ", data)
    return ({
        types: [
            ACCTION.LOGIN,
            ACCTION.LOGIN_SUCCESS,
            ACCTION.LOGIN_FALSE
        ],
        payload: {
            client: "default",
            request: {
                method: "POST",
                url: LOGIN,
                data: convertDataToxUrlencoded(data)
            }
        }
    })
}
export const register = (data) => {
    console.log("register data: ", data)
    return ({
        types: [
            ACCTION.REGISTER,
            ACCTION.REGISTER_SUCCESS,
            ACCTION.REGISTER_FALSE
        ],
        payload: {
            client: "default",
            request: {
                method: "POST",
                url: REGISTER,
                data: convertDataToxUrlencoded(data)
            }
        }
    })
}

export function logoutSystem() {
    return {
        type: ACCTION.LOGOUT_SYSTEM
    }
}