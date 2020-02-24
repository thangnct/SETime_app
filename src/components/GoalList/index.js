import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";

export default class GoalList extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerMode: null,
    };
    render() {

        return (

            <SafeAreaView style={styles.container}>
                <Text>TaskList</Text>
            </SafeAreaView>


        );
    }
}
