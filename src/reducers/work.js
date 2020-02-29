import * as ACCTION from "../const/action-types";

const initState = {
    isLoading: false,
    isSuccess: false,
    dataAddTask: {},
    dataGetTask: {},
    dataUpdateTask: {},
    dataDeleteTask: {},
    dataGetGoal: {},
    dataAddGoal: {},
    dataUpdateGoal: {},
    dataDeleteGoal: {},
};

export default (state = initState, action) => {
    const { type, payload, err } = action;

    switch (type) {
        //ADD_TASK
        case ACCTION.ADD_TASK:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
            };
        case ACCTION.ADD_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                dataAddTask: payload.data.data
            }
        case ACCTION.ADD_TASK_FALSE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                error: err
            }
        //ADD_GOAL
        case ACCTION.ADD_GOAL:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
            };
        case ACCTION.ADD_GOAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                dataAddGoal: payload.data.data
            }
        case ACCTION.ADD_GOAL_FALSE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                error: err
            }

        //GET_GOAL
        case ACCTION.GET_GOAL:

            return {
                ...state,
                isLoading: true,
                isSuccess: false,
            };
        case ACCTION.GET_GOAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                dataGetGoal: payload.data.data
            }
        case ACCTION.GET_GOAL_FALSE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                error: err
            }
        case ACCTION.RESET:
            return {
                dataAddTask: {},
                dataGetTask: {},
                dataUpdateTask: {},
                dataDeleteTask: {},
                dataGetGoal: {},
                dataAddGoal: {},
                dataUpdateGoal: {},
                dataDeleteGoal: {},
            }

        default:
            return state;
    }
}