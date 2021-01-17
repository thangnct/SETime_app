import React, { Component } from "react";
import Home from "../containers/Home"
import TaskList from "../containers/TaskList"
import GoalList from "../containers/GoalList"
import Option from "../containers/Option"
import Icon from 'react-native-vector-icons/FontAwesome';
import Draw from "./DrawerNavigator"
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
const home = <Icon name="home" size={25} color="#AAAAAA" />;
const goal = <Icon name="bullseye" size={25} color="#AAAAAA" />;
const cog = <Icon name="cog" size={25} color="#AAAAAA" />;

import { createBottomTabNavigator } from "react-navigation-tabs";
export default (MainScreenNavigator = createBottomTabNavigator(
  {
    // TaskList: { screen: TaskList, navigationOptions: { tabBarIcon: () => { return task } } },
    // Home: { screen: Home, navigationOptions: { tabBarIcon: () => { return home } } },
    GoalList: { screen: GoalList, navigationOptions: { tabBarIcon: () => { return goal } } },
    // Option: { screen: Option, navigationOptions: { tabBarIcon: () => { return cog } } },
    // Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "GoalList"
    
    // tabBarPosition: "bottom",
    // tabBarComponent: props => <Footer {...props} />
  }
));
