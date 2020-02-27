import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    FlatList, Dimensions
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDatetime, getTimeUseTimezone } from "../../commons";
import ActionButton from 'react-native-action-button';
import DatePicker from 'react-native-datepicker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TaskListWorkingOn from "../../containers/TaskList/WorkingOn"
import TaskListCompleted from "../../containers/TaskList/Completed"



export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            
        }

    }

    render() {
        const renderScene = SceneMap({
            first: TaskListWorkingOn,
            second: TaskListCompleted,
        });
        var { index, routes } = this.state

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.header} >
                    <View style={styles.top} >
                        <View style={styles.info}>
                            <Text style={styles.name}>Tasks</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                   
                </View>

            </SafeAreaView>

        );
    }

    renderBroad = () => {
        return <View style={styles.square} />
    }
    signOut = async () => {
        await AsyncStorage.removeItem("token");
        this.props.navigation.navigate("Auth")
    }
}
