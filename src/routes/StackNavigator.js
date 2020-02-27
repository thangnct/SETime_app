import { createStackNavigator } from "react-navigation-stack";
import TabNavigator from "./TabNavigator";
import AddGoal from "../containers/AddGoal";
import AddTask from "../containers/AddTask";
import TaskListCompleted from "../containers/TaskList/Completed";
import TaskListWorkingOn from "../containers/TaskList/WorkingOn";
import GoalListWorkingOn from "../containers/GoalList/WorkingOn";
import GoalListCompleted from "../containers/GoalList/Completed";

import Drawer from "./DrawerNavigator";

export default AppNavigator = createStackNavigator(
    {
        TabNavigator: { screen: TabNavigator },
        Drawer: { screen: Drawer },
        AddGoal: { screen: AddGoal },
        AddTask: { screen: AddTask },
        TaskListCompleted: { screen: TaskListCompleted },
        TaskListWorkingOn: { screen: TaskListWorkingOn },
        GoalListWorkingOn: { screen: GoalListWorkingOn },
        GoalListCompleted: { screen: GoalListCompleted },

    },
    {
        initialRouteName: "TabNavigator",
        headerMode: 'none',


    }
)
