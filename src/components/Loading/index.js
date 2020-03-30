import React, { Component } from "react";
import { Container, } from "native-base";
import { Text, ActivityIndicator, View } from "react-native"
import styles from "./styles";

export default class Loading extends Component {
    render() {
        const { isLoading } = this.props.auth;
        return (

            <Container style={styles.container}>
                {isLoading == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#C4C4C4" />
                </View> : null}
            </Container>
        );
    }
}
