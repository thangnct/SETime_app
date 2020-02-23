import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading";

class LoadingContainer extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.navigation.navigate("Auth")
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