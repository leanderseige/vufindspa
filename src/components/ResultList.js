import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from './ListItem.js';
import Loader from 'react-loader-spinner'
import store from '../store.js';

class ResultList extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

    }

    handleScroll = (e) => {
        console.log("...scroll...")
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
          console.log("trigger endless scroll")
      }
    }

    render() {

        var output = [];

        for (var key in this.props.results.records) {
          output.push(
            <ListItem idx={key} />
          );
        }

        return (
          <div onScroll={this.handleScroll}>
            {output}
          </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps)(ResultList)
