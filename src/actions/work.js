import * as ACCTION from "../const/action-types";
import {
    ADD_TASK, ADD_GOAL, GET_GOAL, RE
} from "../const/APIs"
import { convertDataToxUrlencoded } from "../commons";
import ActionButton from "react-native-action-button";

export const add_task = (data) => {
    return ({
        types: [
            ACCTION.ADD_TASK,
            ACCTION.ADD_TASK_SUCCESS,
            ACCTION.ADD_TASK_FALSE
        ],
        payload: {
            client: "default",
            request: {
                method: "POST",
                url: ADD_TASK,
                data: convertDataToxUrlencoded(data)
            }
        }
    })
}
export const add_goal = (data) => {
    return ({
        types: [
            ACCTION.ADD_GOAL,
            ACCTION.ADD_GOAL_SUCCESS,
            ACCTION.ADD_GOAL_FALSE
        ],
        payload: {
            client: "default",
            request: {
                method: "POST",
                url: ADD_GOAL,
                data: convertDataToxUrlencoded(data)
            }
        }
    })
}

export const get_goal = (data) => {
    // console.log("action: ", data)
    return ({
        types: [
            ACCTION.GET_GOAL,
            ACCTION.GET_GOAL_SUCCESS,
            ACCTION.GET_GOAL_FALSE
        ],
        payload: {
            client: "default",
            request: {
                method: "POST",
                url: GET_GOAL,
                data: convertDataToxUrlencoded(data)
            }
        }
    })
}

export const reset = () => {
    return ({
        types: ACCTION.RESET
    })
}