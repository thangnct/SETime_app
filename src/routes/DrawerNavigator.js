import { createDrawerNavigator } from "react-navigation-drawer";
import Home from "../containers/Home";
import SlideBar from "../containers/SlideBar";
export default createDrawerNavigator(
    {
        Home: { screen: Home }
    },
    {
        contentComponent: props=> <SlideBar {...props}/>
    }
)