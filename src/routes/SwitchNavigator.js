import { createSwitchNavigator } from "react-navigation";
import Loading from "../containers/Loading";
import App from "./StackNavigator";
import Auth from "./AuthNavigator";

export default SwitchNavigation = createSwitchNavigator(
    {
        Loading: Loading,
        App: App,
        Auth: Auth
    },
    {
        initialRouteName: "App",
        
    }
)