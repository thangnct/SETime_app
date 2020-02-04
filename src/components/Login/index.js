import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.confirmation = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '',
        };

    }

    getCurrentToken = async () => {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        // console.log('User JWT: ', idTokenResult.token);
        return idTokenResult.token;
    }
    componentDidMount() {
        //Trigger auth state changed
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user.toJSON(),
                    token: this.getCurrentToken
                });
                this.props.navigation.navigate("App")
                console.log("User have been login !");
            } else {
                console.log("User has been signed out !");
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '',
                    confirmation: null,
                });
            }
        });
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        return (

            <Container style={styles.container}>
                <View style={styles.top}>

                </View>
                <View style={styles.body}>

                    <View style={styles.formLogin}>
                        <View style={styles.coverTile}>
                            <Text style={styles.loginText}>Login</Text>
                            <Text style={styles.loginTextUnder}>Please login to continue</Text>
                        </View>
                        <View style={styles.coverInput}>
                            <Item>
                                <Icon
                                    name="phone"
                                />

                                <Input
                                    placeholder="Phone"
                                    value={this.state.phoneNumber}
                                    keyboardType={'numeric'}
                                    onChangeText={value =>
                                        this.handleChangeInput("phoneNumber", value)
                                    }
                                />
                            </Item>
                            <Item>
                                <Icon
                                    name="key"
                                />

                                <Input
                                    placeholder="Password"
                                    value={this.state.password}
                                    keyboardType={'numeric'}
                                    onChangeText={value =>
                                        this.handleChangeInput("password", value)
                                    }
                                />
                            </Item>
                        </View>
                        
                        <View style={styles.coverButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.props.navigation.navigate("App");
                                    // this.verifierAuthCode(this.state.codeInput)
                                }}
                            >
                                <Text
                                    style={styles.text_Button}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.textFooter}>
                        Don't have a account ?{" "}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            this.props.navigation.navigate("Register");
                        }}
                    >
                        <Text style={styles.textRegister}>Register now</Text>
                    </TouchableOpacity>
                </View>

            </Container>


        );

    }

    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
        // console.log("state: ", this.state)
    }
}
