import React, { Component } from "react";
import Home from "../containers/Home"
import TaskList from "../containers/TaskList"
// import Drawer from "../containers/Drawer"

import { createBottomTabNavigator } from "react-navigation-tabs";
export default (MainScreenNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home},
    TaskList: { screen: TaskList},
    // Drawer: { screen: Drawer },
  },
  {
    // tabBarPosition: "bottom",
    // tabBarComponent: props => <Footer {...props} />
  }
));
