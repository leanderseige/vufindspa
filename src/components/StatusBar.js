import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
            <AppBar position="static">
                <Toolbar>
                    Results: {this.props.results.resultCount}
                    <IconButton color="inherit" onClick={() => {this._handleOpenClick()}}>
                        <Badge badgeContent={Object.keys(this.props.bookmarks).length} color="secondary">
                            <BookmarkIcon color="white" />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

}


function mapStateToProps(state) {
    return {
        results: state.results,
        bookmarks: state.bookmarks
    }
}

export default connect(mapStateToProps)(StatusBar)
