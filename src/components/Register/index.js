import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Register extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <Container style={styles.container}>
                <View style={styles.top}>

                </View>
                <View style={styles.body}>

                    <View style={styles.formLogin}>
                        <View style={styles.coverTile}>
                            <Text style={styles.loginText}>Register</Text>
                            <Text style={styles.loginTextUnder}>Create an new account</Text>
                        </View>
                        <View style={styles.coverInput}>
                            <Item>
                                <Icon
                                    name="user"
                                />
                                <Input
                                    style={styles.input}
                                    placeholder="Full Name"
                                />
                            </Item>
                            <Item>
                                <Icon
                                    name="envelope"
                                />
                                <Input
                                    style={styles.input}
                                    placeholder="Email"
                                />
                            </Item>
                            <Item>
                                <Icon
                                    name="key"
                                />
                                <Input
                                    style={styles.input}
                                    placeholder="Password"
                                />
                            </Item>
                            <Item>
                                <Icon
                                    name="unlock-alt"
                                />
                                <Input
                                    style={styles.input}
                                    placeholder="Comfirm Password"
                                />
                            </Item>
                        </View>
                        <View style={styles.coverButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.props.navigation.navigate("Login");
                                }}
                            >
                                <Text
                                    style={styles.text_Button}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.textFooter}>
                        Have a account ?{" "}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            this.props.navigation.navigate("Login");
                        }}
                    >
                        <Text style={styles.textRegister}>Register now</Text>
                    </TouchableOpacity>
                </View>

            </Container>


        );
    }
}
