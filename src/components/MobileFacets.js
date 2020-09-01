import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FacetList from './FacetList.js';
import store from '../store.js';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});


class MobileFacets extends React.Component {

    constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        console.log("close")
        store.dispatch({type: 'SET_FLAGS',data: { mobilefacets: false }});
    }

    render() {

      return (
        <Dialog
          className="greybackground"
          onClose={() => {this.handleClose()}}
          aria-labelledby="simple-dialog-title"
          open={this.props.flags.mobilefacets} fullScreen TransitionComponent={Transition}>
          <Button onClick={() => {this.handleClose()}} size="small" variant="contained" color="primary">
              CLOSE
          </Button>
          <FacetList /><br />
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

export default connect(mapStateToProps)(MobileFacets)
