import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    FlatList
} from "react-native";

export default class TaskListCompleted extends Component {
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

}
