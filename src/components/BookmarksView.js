import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import store from '../store.js';


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
        if(this.props.item_data!=false) {
            output.push(<h1 className="TitleView">Bookmarks</h1>)
            output.push(<TextField
              id="outlined-multiline-static"
              label="Data"
              multiline
              rows={20}
              defaultValue={JSON.stringify(this.props.bookmarks, null, 2)}
              variant="outlined"
              className="TitleView"
            />)
        }

      return (
        <Dialog onClose={() => {this.handleClose()}} aria-labelledby="simple-dialog-title" open={open} fullScreen TransitionComponent={Transition}>
            <div className="horizontalpadding">
            {output}<br />
            <Button onClick={() => {this.handleClose()}} size="small" variant="contained" color="primary">
                CLOSE
            </Button>
            </div>
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
