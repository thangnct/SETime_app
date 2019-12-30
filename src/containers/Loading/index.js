import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading";

class LoadingContainer extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.navigation.navigate("App")
    }
    render() {
        return (
            <Loading
                navigator={this.props.navigation}
            />
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingContainer)