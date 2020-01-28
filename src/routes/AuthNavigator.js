import { createStackNavigator } from "react-navigation-stack";
import Login from "../containers/Login";
import Register from "../containers/Register";

export default AuthNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
    },
    {
        initialRouteName: "Login"
    }
)
