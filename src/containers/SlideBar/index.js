import React, { Component } from "react";
import { connect } from "react-redux";
import SlideBar from "../../components/SlideBar";

class SlideBarContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SlideBar
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
)(SlideBarContainer)