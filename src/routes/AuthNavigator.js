import { createStackNavigator } from "react-navigation-stack";
import Login from "../containers/Login";
import Register from "../containers/Register";
import PhoneValidate from "../containers/PhoneValidate";
import VerifyPhone from "../containers/VerifyPhone";

export default AuthNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        PhoneValidate: { screen: PhoneValidate },
        VerifyPhone: { screen: VerifyPhone },
    },
    {
        initialRouteName: "Login",
        headerMode: 'none',
    }
)
