import React, { Component } from "react";
import { Root } from "native-base";
import { createAppContainer } from "react-navigation";
import SwitchNavigator from "./SwitchNavigator"
const AppContainer = createAppContainer(SwitchNavigator)

export default class App extends Component {
    render() {
        return (
            <Root>
                <AppContainer />
            </Root>
        )
    }
}