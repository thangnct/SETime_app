import * as ACCTION from "../const/action-types";
import {
    LOGIN, REGISTER
} from "../const/APIs"
import { convertDatatoFormData, convertDataToxUrlencoded } from "../commons";

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