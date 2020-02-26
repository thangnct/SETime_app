import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    TextInput,
    Picker
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddButton: false,
            taskTitle: "",
            note: "",
            goalSupport: ""
        }
    }
    static navigationOptions = {
        headerMode: null,
    };
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.backButton}>
                        <TouchableOpacity style={styles.backButton}>
                            <Icon name="chevron-left" size={25} color={"#AAAAAA"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.taskOption}>
                        <Text style={styles.saveText}>Save</Text>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.taskTitleContainer}>
                        <TextInput
                            style={styles.taskTitle}
                            onChangeText={text => this.handleChangeInput("taskTitle", text)}
                            value={this.state.taskTitle}
                            placeholder="Task tile"
                        />
                    </View>
                    <View style={styles.goalSupportContainer}>
                        <View style={styles.goalSupportLabel}>
                            <Icon name="bullseye" size={25} color={"#AAAAAA"} />
                            <Text style={styles.goalSupportText}>Support for goal </Text>
                        </View>
                        <View style={styles.goalSupportInput}>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.goalSupport}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ goalSupport: itemValue })
                                }>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                    </View>


                </View>

            </SafeAreaView>
        );
    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }
}
