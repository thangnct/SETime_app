import axios from "axios"
import humps from "humps"
import {
    APP_API_PLANNING
} from "../const/APIs"

const baseClient = (baseUrl) => {
    const instance = axios.create({
        baseURL: baseUrl,
        transformRequest: [
            data => humps.camelizeKeys(JSON.parse(data))
        ]
    })

    return instance
}

export default clients = {
    default: {
        client: baseClient(APP_API_PLANNING)
    }
};