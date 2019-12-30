import React, { Component } from "react";
import { Container,  } from "native-base";
import { Text } from "react-native"
import styles from "./styles";

export default class Loading extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Text>
                    Loading
                </Text>
            </Container>
        );
    }
}
