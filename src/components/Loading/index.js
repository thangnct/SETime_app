import React, { Component } from "react";
import { Container, } from "native-base";
import { Text, ActivityIndicator } from "react-native"
import styles from "./styles";

export default class Loading extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <ActivityIndicator size="large" color="#C4C4C4" />
            </Container>
        );
    }
}
