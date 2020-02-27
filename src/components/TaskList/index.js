import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    FlatList
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDatetime, getTimeUseTimezone } from "../../commons";
import ActionButton from 'react-native-action-button';
import DatePicker from 'react-native-datepicker'



export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,

        }

    }

    render() {

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.header} >
                    <View style={styles.top} >
                        {/* <TouchableOpacity style={styles.option}
                        // onPress={() => { this.props.navigation.openDrawer() }}
                        >
                            <Icon name="cog" color="#C4C4C4" size={28} />
                        </TouchableOpacity> */}
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
