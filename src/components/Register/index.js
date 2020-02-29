import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, Alert,
    ActivityIndicator
} from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast, { DURATION } from 'react-native-easy-toast';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.confirmation = null;
        this.unsubscribe = null;
        this.state = {
            fullName: "",
            phone: "",
            password: "",
            rePassword: ""
        }
    }
    checkObjectEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0
    }
    componentWillReceiveProps(nextProps) {
        const { isLoading, isSuccess, dataCheckAccountExists } = nextProps.auth
        console.log("next props: ", nextProps.auth)
        if (this.checkObjectEmpty(dataCheckAccountExists) && dataCheckAccountExists !== this.props.auth.dataCheckAccountExists && isLoading == false && isSuccess == true) {
            console.log("data register: ", dataCheckAccountExists)
            if (dataCheckAccountExists.code == 0) {
                this.props.navigation.navigate("PhoneValidate", {
                    fullName: this.state.fullName,
                    phone: this.state.phone,
                    password: this.state.password
                });
            } else if (dataCheckAccountExists.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataCheckAccountExists.message)
            }
        }

    }
    render() {
        const { isLoading, isSuccess } = this.props.auth;
        return (

            <Container style={styles.container}>

                {isLoading == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color="#C4C4C4" /></View> :
                    <View style={{ flex: 1 }}>
                        <Toast
                            ref="toast"
                            position='bottom'
                            positionValue={200}
                            fadeInDuration={750}
                            fadeOutDuration={1000}
                            opacity={0.8}
                        />
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
                                            onChangeText={value => this.handleInput("fullName", value)}
                                        />
                                    </Item>
                                    <Item>
                                        <Icon
                                            name="phone"
                                        />
                                        <Input
                                            style={styles.input}
                                            placeholder="Phone"
                                            onChangeText={value => this.handleInput("phone", value)}
                                        />
                                    </Item>
                                    <Item>
                                        <Icon
                                            name="key"
                                        />
                                        <Input
                                            style={styles.input}
                                            secureTextEntry={true}
                                            placeholder="Password"
                                            onChangeText={value => this.handleInput("password", value)}
                                        />
                                    </Item>
                                    <Item>
                                        <Icon
                                            name="unlock-alt"
                                        />
                                        <Input
                                            style={styles.input}
                                            secureTextEntry={true}
                                            placeholder="Comfirm Password"
                                            onChangeText={value => this.handleInput("rePassword", value)}
                                        />
                                    </Item>
                                </View>
                                <View style={styles.coverButton}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            this.handleRegister()
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
                                <Text style={styles.textRegister}>Login now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </Container>


        );
    }
    validatePhone = phone => {
        var re = /^\d{10}$/;
        return re.test(phone);
    };
    validate = () => {
        console.log("State: ", this.state)
        if (this.state.fullName.length == 0) {
            this.refs.toast.show('Name is not null');
            return false;
        } else if (!this.validatePhone(this.state.phone)) {
            this.refs.toast.show('Check phone number');
            return false;
        } else if (this.state.password.length < 6) {
            this.refs.toast.show('Passwords must be at least 6 characters.');
            return false;
        } else if (this.state.password !== this.state.rePassword) {
            this.refs.toast.show('Password not match');
            return false;
        }
        return true;
    }
    handleRegister = async () => {
        // console.log("Poneee: ", this.state.phone)
        // if (this.validate() === true) {
        this.props.dispatchCheck_account_exists({
            account: this.state.phone
        })
        // }
    }

    confirmPhone = async (phone) => {

    }

    handleInput = (name, value) => {
        this.setState({
            [name]: value
        })
        // console.log("state: ", this.state)
    }
}
