import { createDrawerNavigator } from "react-navigation-drawer";
import Home from "../containers/Home";
import SlideBar from "../containers/SlideBar";
export default createDrawerNavigator(
  {
    Home: { screen: Home },
    SlideBar: { screen: SlideBar }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SlideBar {...props} />
  }
)