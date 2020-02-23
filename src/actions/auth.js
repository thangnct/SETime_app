import * as ACCTION from "../const/action-types";
import {
    LOGIN
} from "../const/APIs"
import { convertDatatoFormData , convertDataToxUrlencoded} from "../commons";

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

export function logoutSystem() {
    return {
        type: ACCTION.LOGOUT_SYSTEM
    }
}