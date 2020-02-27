import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    TextInput,
    Switch, FlatList
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
            taskListInDay: [
                { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: 1, taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
                { id: 1, taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
                { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: 1, taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
                { id: 1, taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },

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
                            placeholder="Goal tile"
                        />
                    </View>
                    <View style={styles.items}>
                        <View style={styles.itemsLabel}>
                            <View style={styles.icon_label}>
                                <Icon name="calendar" size={25} color={"#AAAAAA"} />
                            </View>
                            <View style={styles.text_label}>
                                <Text style={styles.itemLabelText}>Expiration date</Text>
                            </View>
                        </View>
                        <View style={styles.itemsInput}>
                            <View style={styles.pickerStartEndTime}>
                                <DatePicker
                                    style={styles.textinput_Date}
                                    date={this.state.startTime}
                                    mode="datetime"
                                    confirmBtnText="OK"
                                    cancelBtnText="Cancel"
                                    // minDate={this.state.startTime || ""}
                                    // maxDate={this.state.endTime || ""}
                                    // placeholder="Pick time"
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
                    </View>

                    <View style={styles.items}>
                        <View style={styles.itemsLabel}>
                            <View style={styles.icon_label}>
                                <Icon name="paint-brush" size={25} color={"#AAAAAA"} />
                            </View>
                            <View style={styles.text_label}>
                                <Text style={styles.itemLabelText}>Color</Text>
                            </View>
                        </View>
                        <View style={styles.itemsInput}>
                            {/* <View style={styles.allDay}>
                                <Text style={{ marginRight: 15 }} >All day</Text>
                                <Switch
                                    value={this.state.isAllDay}
                                    onValueChange={value => {
                                        this.setState({ isAllDay: value }, () => {
                                            console.log(this.state.isAllDay)
                                        })
                                    }}
                                />
                            </View> */}
                            <Picker
                                mode="dropdown"
                                placeholder="Blue"
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
                    {!this.state.isAllDay ? this.renderTimeBound() : null}

                    <View style={styles.items}>
                        <View style={styles.itemsLabel}>
                            <View style={styles.icon_label}>
                                <Icon name="sticky-note" size={25} color={"#AAAAAA"} />
                            </View>
                            <View style={styles.text_label}>
                                <Text style={styles.itemLabelText}>Describe </Text>
                            </View>
                        </View>
                        <View style={styles.itemsInput}>

                        </View>
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            style={{
                                multiline: true,
                                height: 100,
                                marginLeft: 10,
                                marginRight: 10,
                                borderColor: '#AAAAAA',
                                borderWidth: 1,
                                fontSize: 18,
                                fontWeight: "600",
                                color: "#3E3D3D",
                                flex: 1
                            }}
                            multiline={true}
                            numberOfLines={5}
                        />
                    </View>
                    <View style={styles.items}>
                        <View style={styles.itemsLabel}>
                            <View style={styles.icon_label}>
                                <Icon name="trophy" size={25} color={"#AAAAAA"} />
                            </View>
                            <View style={styles.text_label}>
                                <Text style={styles.itemLabelText}>Reward </Text>
                            </View>
                        </View>
                        <View style={styles.itemsInput}>

                        </View>
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            style={{
                                multiline: true,
                                height: 50,
                                marginLeft: 10,
                                marginRight: 10,
                                borderColor: '#AAAAAA',
                                borderWidth: 1,
                                fontSize: 18,
                                fontWeight: "600",
                                color: "#3E3D3D",
                                flex: 1
                            }}
                            multiline={true}
                            numberOfLines={5}
                        />
                    </View>

                    <View style={styles.items}>
                        <View style={styles.itemsLabel}>
                            <View style={styles.icon_label}>
                                <Icon name="tasks" size={25} color={"#AAAAAA"} />
                            </View>
                            <View style={styles.text_label}>
                                <Text style={styles.itemLabelText}>Task </Text>
                            </View>
                        </View>
                        <View style={styles.itemsInput}>

                        </View>
                    </View>
                    <View style={styles.thingsTodo}>

                        <FlatList
                            data={this.state.taskListInDay}
                            renderItem={({ item }) => <View style={{
                                height: 50, borderRadius: 5, marginLeft: 15,
                                marginRight: 5, flexDirection: "row", justifyContent: "flex-start",
                                alignItems: "center", marginTop: 3
                            }}>
                                <View style={styles.taskTodo}>
                                    <Text style={styles.weekday}>{item.taskTitle}</Text>
                                    <Text style={styles.timeBound}>{item.timeBound}</Text>
                                </View>
                            </View>}
                        />

                    </View>
                    <View style={styles.items}>
                        <View style={styles.itemsLabel}>

                        </View>
                        <View style={styles.itemsInput}>
                            <TouchableOpacity style={[styles.addButton]}
                                onPress={this.changeAddButtonState}
                            >
                                <Text style={styles.addTaskText} >Add task</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
