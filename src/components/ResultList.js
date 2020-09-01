import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from './ListItem.js';
import Alert from '@material-ui/lab/Alert';
import Loader from 'react-loader-spinner'
import store from '../store.js';

class ResultList extends React.Component {

    constructor(props) {
        super(props);
        this._handleButtonClick = this._handleButtonClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll = (e) => {
        console.log("...scroll...")
        const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop - 1) <= e.target.clientHeight;
        if (bottom) {
          console.log("trigger endless scroll")
          if(this.props.flags.appending===false && this.props.flags.endofresults===false) {
            store.dispatch({ type: 'SET_FLAGS', data: { appending: true }})
          }
        }
    }
    _handleButtonClick(e) {
        if(this.props.flags.appending===false) {
          store.dispatch({ type: 'SET_FLAGS', data: { appending: true }})
        }
    }

    render() {

        if(this.props.flags.loading) {
            return(<Loader type="Oval" color="#ccc" height={100} width={100} className="allauto" />)
        }

        var output = [];
        var count = 1;
        for (var key in this.props.results.records) {
          if(Object.keys(this.props.results.records[key]).length>0) {
              output.push(
                <ListItem idx={key} rec={this.props.results.records[key]} count={count} />
              );
              count++;
          }
        }
        if(this.props.flags.appending) {
            output.push(
                <Loader type="Grid" color="#ccc" height={100} width={100} />
            )
        }
        if(this.props.flags.endofresults) {
            output.push(
                <Alert severity="info" className="verticalpadding">No more results!</Alert>
            )
        }
        return (
            <div onScroll={this.handleScroll} className="scrollable">
                {output}
            </div>
        );
    }

}

// <br />
// <Button className="morebutton" size="large" variant="contained" color="primary" onClick={this._handleButtonClick}>More</Button>


function mapStateToProps(state) {
    return {
        results: state.results,
        flags: state.flags
    }
}

export default connect(mapStateToProps)(ResultList)
