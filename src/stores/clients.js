import axios from "axios"
import humps from "humps"
import {
    APP_API_PLANNING
} from "../const/APIs"

const baseClient = (baseUrl) => {

    try {
        const instance = axios.create({
            baseURL: baseUrl,
            transformResponse: [
                data => {
                    return JSON.parse(data)
                    // return humps.camelizeKeys(JSON.parse(data))
                }
            ]
        })
        return instance
    } catch (error) {
        console.log("Loi roi:", error)
    }

}

export default clients = {
    default: {
        client: baseClient(APP_API_PLANNING)
    }
};