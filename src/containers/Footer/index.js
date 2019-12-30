import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";

class FooterContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Footer
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
)(FooterContainer)