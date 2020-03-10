import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import AsyncStorage from '@react-native-community/async-storage';
class LoadingContainer extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {

        try {
            const { token } = this.props.auth;
            if (token) {
                this.props.navigation.navigate("App")
            } else {
                this.props.navigation.navigate("Auth")
            }
        } catch (error) {
            this.props.navigation.navigate("Auth")
        }

    }
    render() {
        return (
            <Loading
                navigator={this.props.navigation}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingContainer)