import { createSwitchNavigator } from "react-navigation";
import Loading from "../containers/Loading";
import App from "./StackNavigator";
import Login from "../containers/Login";
import Register from "../containers/Register";
export default SwitchNavigation = createSwitchNavigator(
    {
        Loading: Loading,
        App: App,
        Login: Login,
        Register: Register
    },
    {
        initialRouteName: "Loading"
    }
)