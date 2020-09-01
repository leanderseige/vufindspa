import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import ReactJson from 'react-json-view'
import { Link as RLink } from 'react-router-dom';
import store from '../store.js';
import ListItem from './ListItem.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class BookmarksView extends React.Component {

    constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        console.log("close")
        store.dispatch({type: 'SET_FLAGS',data: { bookmarkdialog: false }});
    }

    render() {
        var open = this.props.flags.bookmarkdialog
        var output = []

        // output.push(<ReactJson src={this.props.bookmarks} enableClipboard={false} />)
        var count = 1
        for(var key in this.props.bookmarks) {
          output.push(
            <ListItem idx={key} rec={this.props.bookmarks[key]} count={count} />
          )
          count++
        }

      return (
        <Dialog onClose={() => {this.handleClose()}} aria-labelledby="simple-dialog-title" open={open} fullScreen TransitionComponent={Transition} className="greybackground">
            <Button onClick={() => {this.handleClose()}} size="small" variant="contained" color="primary">
                CLOSE
            </Button>
            <h1 className="TitleView">Bookmarks</h1>
            {output}
         </Dialog>
      );

    }
}

function mapStateToProps(state) {
    return {
        flags: state.flags,
        bookmarks: state.bookmarks
    }
}

export default connect(mapStateToProps)(BookmarksView)
