import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    TextInput,
    FlatList,
    ActivityIndicator,
    Alert
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Picker,

} from "native-base";
import moment from "moment";
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {

            color: "",
            // taskListInDay: [
            //     { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
            // ],
            describe: "",
            goalTitle: "",
            startTime: "",
            endTime: "",

            colorAvaiable: [
                { name: "red", code: "#123456" },
                { name: "blue", code: "#999999" }
            ],
            reward: "",
            tasks: []

        }
    }

    checkObjectEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0
    }
    async componentWillReceiveProps(nextProps) {

        const { isLoading, isSuccess, dataAddGoal } = nextProps.work
        if (this.checkObjectEmpty(dataAddGoal) && dataAddGoal !== this.props.work.dataAddGoal && isLoading == false && isSuccess == true) {
            console.log("dataAddGoal: ", dataAddGoal)
            if (dataAddGoal.code == 1) {
                Alert.alert("Notification", dataAddGoal.message)
                this.props.navigation.goBack();

            } else if (dataAddGoal.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataAddGoal.message)
            }
        }
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                {this.props.work.isLoading == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#C4C4C4" />
                </View> :
                    <View style={{ flex: 1 }}>
                        <Toast ref="toast"
                            position="bottom"
                        />
                        <View style={styles.top}>
                            <View style={styles.backButton}>
                                <TouchableOpacity style={styles.backButton}
                                    onPress={() => { this.props.navigation.goBack() }}
                                >
                                    <Icon name="chevron-left" size={25} color={"#AAAAAA"} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.taskOption}>
                                <TouchableOpacity onPress={() => { this.handleSaveGoal() }}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.goBack() }}
                                >
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.taskTitleContainer}>
                                <TextInput
                                    style={styles.taskTitle}
                                    onChangeText={text => this.handleChangeInput("goalTitle", text)}
                                    value={this.state.taskTitle}
                                    placeholder="Goal tile"
                                />
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1 }}>
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

                                    </View>
                                </View>
                                <View style={styles.items}>
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

                                        <Picker
                                            mode="dropdown"
                                            placeholder="Pick color"
                                            style={{ width: undefined, fontWeight: "bold" }}
                                            selectedValue={this.state.color}
                                            onValueChange={(value) => { this.setState({ color: value }) }}
                                        >
                                            {this.state.colorAvaiable.map(color => {
                                                return <Picker.Item label={color.name} value={color.code} />
                                            })}
                                        </Picker>


                                    </View>
                                </View>


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

                                            height: 100,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderColor: '#AAAAAA',
                                            borderWidth: 1,
                                            fontSize: 18,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        onChangeText={text => this.handleChangeInput("describe", text)}
                                        multiline={true}
                                        numberOfLines={2}
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

                                            height: 50,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderColor: '#AAAAAA',
                                            borderWidth: 1,
                                            fontSize: 18,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        onChangeText={text => this.handleChangeInput("reward", text)}
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
                                        data={this.state.tasks}
                                        renderItem={({ item, key }) => <View style={{
                                            height: 50,
                                            borderRadius: 5, marginLeft: 15,
                                            marginRight: 5, flexDirection: "row",
                                            justifyContent: "flex-start",
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
                                            onPress={() => this.props.navigation.navigate("AddTask", { previousScreen: "AddGoal" })}
                                        >
                                            <Text style={styles.addTaskText} >Add task</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>}



            </SafeAreaView>
        );
    }
    validate = () => {
        if (this.state.goalTitle.length == 0) {
            this.refs.toast.show("Goal title is not null.");
            return false
        } else if (this.state.startTime.length == 0) {
            this.refs.toast.show("You must pick start time.");
            return false
        } else if (this.state.endTime.length == 0) {
            this.refs.toast.show("You must pick end time.");
            return false
        } else {
            return true
        }
    }
    handleSaveGoal = () => {
        if (this.validate() === true) {
            this.props.dispatchAddGoal({
                token: this.props.auth.token,
                goalTitle: this.state.goalTitle,
                color: this.state.color,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                describe: this.state.describe,
                reward: this.state.reward,
                tasks: this.state.tasks,

            })
        }

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
