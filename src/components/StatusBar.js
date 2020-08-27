import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import store from '../store.js';

class StatusBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            Results: {this.props.results.resultCount}
          </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps)(StatusBar)
