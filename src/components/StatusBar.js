import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import store from '../store.js';

class StatusBar extends React.Component {

    constructor(props) {
        super(props);
        this._handleOpenClick = this._handleOpenClick.bind(this);
    }

    _handleOpenClick(id) {
        store.dispatch({type: 'SET_FLAGS',data: { bookmarkdialog: true }});
    }

    render() {
        return (
          <div>
              <IconButton aria-label="bookmark" onClick={() => {this._handleOpenClick()}}>
                <BookmarkIcon />
              </IconButton>
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
