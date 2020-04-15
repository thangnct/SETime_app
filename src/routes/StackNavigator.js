import { createStackNavigator } from "react-navigation-stack";
import TabNavigator from "./TabNavigator";
import AddGoal from "../containers/AddGoal";
import AddTask from "../containers/AddTask";
import TaskDetail from "../containers/TaskDetail";
import GoalDetail from "../containers/GoalDetail";

import Drawer from "./DrawerNavigator";

export default AppNavigator = createStackNavigator(
    {
        TabNavigator: { screen: TabNavigator },
        Drawer: { screen: Drawer },
        AddGoal: { screen: AddGoal },
        AddTask: { screen: AddTask },
        TaskDetail: { screen: TaskDetail },
        GoalDetail: { screen: GoalDetail },

    },
    {
        initialRouteName: "TabNavigator",
        headerMode: 'none',


    }
)
