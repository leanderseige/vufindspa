import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ViewListIcon from '@material-ui/icons/ViewList';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class StatusBar extends React.Component {

    constructor(props) {
        super(props);
        this._handleOpenBookmarksClick = this._handleOpenBookmarksClick.bind(this);
        this._handleOpenMobileFacetsClick = this._handleOpenMobileFacetsClick.bind(this);
    }

    _handleOpenBookmarksClick(id) {
        store.dispatch({type: 'SET_FLAGS',data: { bookmarkdialog: true }});
    }

    _handleOpenMobileFacetsClick(id) {
        store.dispatch({type: 'SET_FLAGS',data: { mobilefacets: true }});
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    Results: {this.props.results.resultCount}
                    <div className="horizontalpadding">
                    <IconButton color="inherit" onClick={() => {this._handleOpenBookmarksClick()}}>
                        <Badge badgeContent={Object.keys(this.props.bookmarks).length} color="secondary">
                            <BookmarkIcon color="white" />
                        </Badge>
                    </IconButton>
                    </div>
                    <div className="mobileonly horizontalpadding">
                    <IconButton color="inherit" onClick={() => {this._handleOpenMobileFacetsClick()}} >
                      <Badge badgeContent={Object.keys(this.props.search.filter).length} color="secondary">
                        <ViewListIcon />
                      </Badge>
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }

}


function mapStateToProps(state) {
    return {
        results: state.results,
        search: state.search,
        bookmarks: state.bookmarks
    }
}

export default connect(mapStateToProps)(StatusBar)
