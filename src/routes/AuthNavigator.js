import { createStackNavigator } from "react-navigation-stack";
import Login from "../containers/Login";
import Register from "../containers/Register";
import VerifyPhone from "../containers/VerifyPhone";

export default AuthNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        VerifyPhone: { screen: VerifyPhone },
    },
    {
        initialRouteName: "Login"
    }
)
