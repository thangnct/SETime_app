import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-input'

export default class PhoneValidate extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.confirmation = null;
        this.state = {
            phone: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.auth.isLoading == true ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#C4C4C4" />
                    </View> :
                    <View style={{ flex: 1 }} >

                        <View style={styles.top}>

                            <TouchableOpacity style={styles.backButton}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Icon name="chevron-left" size={25} color={"#AAAAAA"} />
                            </TouchableOpacity>

                        </View>

                        <View style={styles.body}>

                            <View style={styles.formLogin}>
                                <View style={styles.coverTile}>
                                    <Text style={styles.loginText}>Validate Phone</Text>
                                    <Text style={styles.loginTextUnder}>We will send a verification message to your phone number.</Text>
                                </View>
                                <View style={styles.coverInput}>
                                    <Item>
                                        <PhoneInput
                                            // disabled={true}
                                            value={this.props.navigation.getParam("phone")}
                                            initialCountry="vn"
                                            ref={phone => {
                                                this.phone = phone;
                                            }}
                                        />

                                    </Item>
                                </View>

                                <View style={styles.coverButton}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            this.confirmPhone()
                                        }}
                                    >
                                        <Text style={styles.text_Button}>
                                            Confirm
                                            </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.footer}>

                        </View>
                    </View>}

            </View>
        );
    }
    verifierAuthCode = async (authCode) => {
        console.log("confirm: ", this.confirmation)
        try {
            if (this.confirmation !== null) {
                await this.confirmation.confirm(authCode); // User entered code
                // Successful login - onAuthStateChanged is triggered
            } else {
                Alert.alert("Thông báo", "Vui lòng lấy mã OTP để xác thực !")
            }
        } catch (e) {
            console.error(e); // Invalid code
        }
    }
    handleConfirm = () => {
        this.setState({
            valid: this.phone.isValidNumber(),
            type: this.phone.getNumberType(),
            phone: this.phone.getValue()
        }, async () => {
            console.log("states: ", this.state)
            if (this.state.valid === true) {
                try {
                    this.confirmation = await auth().signInWithPhoneNumber(this.state.phone);
                    this.props.navigation.navigate("VerifyPhone", {
                        confirmation: this.confirmation,
                        fullName: this.props.navigation.getParam("fullName"),
                        phone: this.props.navigation.getParam("phone"),
                        password: this.props.navigation.getParam("password")
                    });
                } catch (err) {
                    console.log("Error: ", err)
                    Alert.alert("Thông báo", "Chúng tôi đã chặn tất cả các yêu cầu từ thiết của bạn do phát hiện hoạt động bất thường. Vui lòng thử lại sau.")
                }
            } else {
                Alert.alert("Thông báo", "Phone is not valid")
            }
        });

    }
    confirmPhone = async () => {
        this.handleConfirm();
    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }
}
