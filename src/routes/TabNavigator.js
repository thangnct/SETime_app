import React, { Component } from "react";
import Home from "../containers/Home"
import TaskList from "../containers/TaskList"
import Footer from "../containers/Footer"
import { createBottomTabNavigator } from "react-navigation-tabs";

export default (MainScreenNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home},
    TaskList: { screen: TaskList},
  },
  {
    // tabBarPosition: "bottom",
    // tabBarComponent: props => <Footer {...props} />
  }
));
