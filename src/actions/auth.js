import * as ACCTION from "../const/action-types";
import {
    LOGIN
} from "../const/APIs"
import { convertDatatoFormData } from "../commons";

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
                data: convertDatatoFormData(data)
            }
        }
    })
}

export function logoutSystem() {
    return {
        type: ACCTION.LOGOUT_SYSTEM
    }
}