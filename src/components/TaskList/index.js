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
import {
    Tabs,
    Tab,
} from "native-base";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TaskListStatus from "../../containers/TaskListStatus"



export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            taskList: [
                { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: 1, taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
                { id: 1, taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
                { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: 1, taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
                { id: 1, taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
            ],
        }

    }

    render() {

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.header} >
                    <View style={styles.top} >
                        <View style={styles.info}>
                            <Text style={styles.name}>Tasks List</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Tabs
                        tabBarUnderlineStyle={{ backgroundColor: "#F2994A" }}
                        locked
                        onChangeTab={({ ref }) =>
                            console.log("lalalla: ", ref.props.heading)
                            // this.tabChanged(ref.props.heading)
                        }
                    >
                        <Tab
                            heading="Working on"
                            activeTextStyle={{ textAlign: "center", color: "#F2994A", fontWeight: "bold" }}
                            activeTabStyle={{ backgroundColor: "#FFFFFF" }}
                            tabStyle={{ backgroundColor: "#FFFFFF" }}
                            textStyle={{ color: "#979797", textAlign: "center", fontWeight: "bold" }}
                        >
                            <TaskListStatus
                                taskList={this.state.taskList}
                                navigation={this.props.navigation}
                            //loading={loading}
                            />
                            {/* <Paid //data={dataListOrder} navigation={this.props.navigation} /> */}
                        </Tab>
                        <Tab
                            heading="Completed"
                            activeTextStyle={{ textAlign: "center", color: "#F2994A", fontWeight: "bold" }}
                            activeTabStyle={{ backgroundColor: "#FFFFFF" }}
                            tabStyle={{ backgroundColor: "#FFFFFF" }}
                            textStyle={{ color: "#979797", textAlign: "center", fontWeight: "bold" }}
                        >
                            <TaskListStatus
                                data={this.state.taskList}
                                navigation={this.props.navigation}
                            //loading={loading}
                            />
                        </Tab>

                    </Tabs>

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
