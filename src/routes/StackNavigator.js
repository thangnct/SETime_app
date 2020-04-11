import { createStackNavigator } from "react-navigation-stack";
import TabNavigator from "./TabNavigator";
import AddGoal from "../containers/AddGoal";
import AddTask from "../containers/AddTask";
import TaskDetail from "../containers/TaskDetail";

import Drawer from "./DrawerNavigator";

export default AppNavigator = createStackNavigator(
    {
        TabNavigator: { screen: TabNavigator },
        Drawer: { screen: Drawer },
        AddGoal: { screen: AddGoal },
        AddTask: { screen: AddTask },
        TaskDetail: { screen: TaskDetail },

    },
    {
        initialRouteName: "TabNavigator",
        headerMode: 'none',


    }
)
