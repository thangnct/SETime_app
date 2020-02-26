import React, { Component } from "react";
import styles from "./styles";
import {
  Text, View, TouchableOpacity, SafeAreaView,
  ScrollView,
  TextInput,
  Picker,
  Switch
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
      goalSupport: "",
      isAllDay: true
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
                selectedValue={this.state.goalSupport}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ goalSupport: itemValue })
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
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
              <Text style={{ marginRight: 15 }} >All day</Text>
              <Switch
                value={this.state.isAllDay}
                onValueChange={value => {
                  this.setState({ isAllDay: value }, () => {
                    console.log(this.state.isAllDay)
                  })
                }}
              />
              {/* {this.renderTimeBound()} */}
            </View>
          </View>


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
                selectedValue={this.state.goalSupport}
                style={styles.picker}
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

  renderTimeBound = () => {
    return <View style={{ flex: 1 }}>
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
          
        </View>
      </View>
    </View>
  }
  handleChangeInput = (name, value) => {
    this.setState({
      [name]: value
    })
  }
}
