import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    FlatList,
} from "react-native";
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

export default class GoalListStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goalList: this.props.goalList || []

        }

    }

    render() {
        console.log("4321: ", this.props.goalList,)
        console.log("19191: ", this.state.goalList,)
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.goalList}
                    renderItem={({ item }) => <TouchableOpacity style={{
                        height: 100, borderRadius: 5, flexDirection: "row", justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 15,
                        borderWidth: 0.5,
                        borderLeftColor: item.color,
                        borderLeftWidth: 5,
                        borderTopColor: "#AAAAAA",
                        borderRightColor: "#AAAAAA",
                        borderBottomColor: "#AAAAAA",
                        marginRight: 20,
                        marginLeft: 20,
                        flex: 1,
                        // backgroundColor: "green"
                    }}>
                        
                        <View style={styles.goal}>
                            <Text style={styles.goalTitle}>{item.goalTitle}</Text>
                            <Text style={styles.timeBound}>{item.startTime} - {item.endTime}</Text>
                            <Text style={styles.ratioStatus}>2 Completed - 1 working on</Text>
                        </View>
                        {/* <View style={styles.ratioCompleted}>
                            <TouchableOpacity style={[styles.ratioButton]}
                                onPress={() => this.props.navigation.navigate("AddTask")}
                            >
                                <Text style={styles.ratioText} >{item.completedRatio}%</Text>
                            </TouchableOpacity>

                        </View> */}
                    </TouchableOpacity>}
                />
                <ActionButton buttonColor="#F2994A">
                    <ActionButton.Item buttonColor='#FFFFFF' title="Add goal" onPress={() => this.props.navigation.navigate("AddGoal")}>
                        <Icon name="circle" color="#F2994A" size={20} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FFFFFF' title="Add task" onPress={() => { this.props.navigation.navigate("AddTask") }}>
                        <Icon name="tasks" color="#F2994A" size={20} />
                    </ActionButton.Item>
                </ActionButton>
            </SafeAreaView>

        );
    }
}
