import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddButton: false
        }
    }
    static navigationOptions = {
        headerMode: null,
    };
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.backButton}></View>
                </View>
                <View style={styles.body}></View>

            </SafeAreaView>
        );
    }

}
