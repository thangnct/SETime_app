import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    TextInput,
    Switch
} from "react-native";
import {
    Picker,

} from "native-base";
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddButton: false,
            taskTitle: "",
            note: "",
            goalSupport: "",
            isAllDay: true,
            goalAvailable: [
                { goalId: 1, goalTitle: "Get Link" },
                { goalId: 3, goalTitle: "Stronger" },
                { goalId: 4, goalTitle: "Getup early" },
            ],
            isAllDay: true,
            startTime: "",
            endTime: ""

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
                        <TouchableOpacity style={styles.backButton}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Icon name="chevron-left" size={25} color={"#AAAAAA"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.taskOption}>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
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
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.items}>
                            <View style={styles.itemsLabel}>
                                <View style={styles.icon_label}>
                                    <Icon name="bullseye" size={25} color={"#AAAAAA"} />
                                </View>
                                <View style={styles.text_label}>
                                    <Text style={styles.itemLabelText}>Support for goal </Text>
                                </View>
                            </View>
                            <View style={styles.itemsInput}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Pick goal"
                                    style={{ width: undefined, fontWeight: "bold" }}
                                    selectedValue={this.state.goalSupport}
                                    onValueChange={(value) => { this.setState({ goalSupport: value }) }}
                                >
                                    {this.state.goalAvailable.map(goal => {
                                        return <Picker.Item label={goal.goalTitle} value={goal.goalId} />
                                    })}
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.items}>
                            <View style={styles.itemsLabel}>
                                <View style={styles.icon_label}>
                                    <Icon name="calendar" size={25} color={"#AAAAAA"} />
                                </View>
                                <View style={styles.text_label}>
                                    <Text style={styles.itemLabelText}>Time-bound</Text>
                                </View>
                            </View>
                            <View style={styles.itemsInput}>
                                <View style={styles.allDay}>
                                    <Text style={{ marginRight: 15 }} >All day</Text>
                                    <Switch
                                        value={this.state.isAllDay}
                                        onValueChange={value => {
                                            this.setState({ isAllDay: value }, () => {
                                                console.log(this.state.isAllDay)
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        {!this.state.isAllDay ? this.renderTimeBound() : null}

                        <View style={styles.items}>
                            <View style={styles.itemsLabel}>
                                <View style={styles.icon_label}>
                                    <Icon name="sticky-note" size={25} color={"#AAAAAA"} />
                                </View>
                                <View style={styles.text_label}>
                                    <Text style={styles.itemLabelText}>Note </Text>
                                </View>
                            </View>
                            <View style={styles.itemsInput}>

                            </View>
                        </View>
                        <View style={styles.items}>
                            <TextInput
                                style={{
                                    // multiline: true,
                                    height: 100,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    borderColor: '#AAAAAA',
                                    borderWidth: 1,
                                    fontSize: 16,
                                    color: "#3E3D3D",
                                    flex: 1
                                }}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                    </ScrollView>



                </View>

            </SafeAreaView>
        );
    }

    renderTimeBound = () => {
        return <View >
            <View style={styles.items}>
                <View style={styles.itemsLabel}>

                </View>
                <View style={styles.itemsInput}>
                    <View style={styles.timeStartEndContainer}>
                        <View style={styles.timeStartEnd}>
                            <View style={styles.labelStartEndTime}>
                                <Text>Start: </Text>
                            </View>
                            <View style={styles.pickerStartEndTime}>
                                <DatePicker
                                    style={styles.textinput_Date}
                                    date={this.state.startTime}
                                    mode="datetime"
                                    confirmBtnText="OK"
                                    cancelBtnText="Cancel"
                                    // minDate={this.state.startTime || ""}
                                    // maxDate={this.state.endTime || ""}
                                    placeholder="Pick time"
                                    format="YYYY-MM-DD HH:mm"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            height: 20,
                                            borderTopWidth: 0,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderBottomWidth: 0,
                                            marginBottom: 0
                                        },
                                    }}
                                    onDateChange={(date) => { this.handleChangeInput("startTime", date) }}
                                />
                            </View>

                        </View>
                        <View style={styles.timeStartEnd}>
                            <View style={styles.labelStartEndTime}>
                                <Text>Finish: </Text>
                            </View>
                            <View style={styles.pickerStartEndTime}>
                                <DatePicker
                                    style={styles.textinput_Date}
                                    date={this.state.endTime}
                                    mode="datetime"
                                    confirmBtnText="OK"
                                    cancelBtnText="Cancel"
                                    placeholder="Pick time"
                                    // minDate={this.state.startTime || ""}
                                    // maxDate={this.state.endTime || ""}
                                    format="YYYY-MM-DD HH:mm"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            height: 20,
                                            borderTopWidth: 0,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderBottomWidth: 0,
                                            marginBottom: 0
                                        },
                                    }}
                                    onDateChange={(date) => { this.handleChangeInput("endTime", date) }}
                                />
                            </View>

                        </View>

                    </View>
                </View>
            </View>
        </View>
    }
    checkStartEndTime = () => {
        return this.state.endTime > this.state.startTime
    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }
}
