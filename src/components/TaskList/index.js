import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import { Item, Input } from 'native-base';

export default class TaskList extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerMode: null,
    };    
    render() {
        
        return (

            <Container style={styles.container}>
                <Text>TaskList</Text>
            </Container>


        );
    }
}
