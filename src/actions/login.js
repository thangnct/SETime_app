import ACCTION from "../const/action-types";
import {
    LOGIN
} from "../const/APIs"
import { from } from "rxjs";
export function logoutSystem() {
    return {
        type: ACCTION.LOGOUT_SYSTEM
    }
}
import { convertDatatoFormData } from "../commons";
export const login = (data) => {
    return ({
        types: [
            ACCTION.LOGIN_WITH_FIREBASE,
            ACCTION.LOGIN_WITH_FIREBASE_SUCCESS,
            ACCTION.LOGIN_WITH_FIREBASE_FALSE
        ],
        payload: {
            client: "",
            request: {
                method: "",
                url: "",
                data: convertDatatoFormData(data)
            }
        }
    })
}
