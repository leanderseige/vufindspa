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


class TitleView extends React.Component {

    constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        console.log("close")
        store.dispatch({type: 'SET_ITEM_DATA',data: { item_data: false }});
    }

    render() {

        var open = false
        var output = []
        if(this.props.item_data!=false) {
            open = true
            output.push(<h1 className="TitleView">{this.props.item_data.records[0].title.replace(/\/$/g,'')}</h1>)
            output.push(<TextField
              id="outlined-multiline-static"
              label="Data"
              multiline
              rows={20}
              defaultValue={JSON.stringify(this.props.item_data.records[0], null, 2)}
              variant="outlined"
              className="TitleView"
            />)
        }

      return (
        <Dialog onClose={() => {this.handleClose()}} aria-labelledby="simple-dialog-title" open={open} fullScreen TransitionComponent={Transition}>
            <div className="TitleView">
            {output}
            <Button onClick={() => {this.handleClose()}} color="primary">
                CLOSE
            </Button>
            </div>
         </Dialog>
      );

    }
}

function mapStateToProps(state) {
    return {
        item_data: state.item_data
    }
}

export default connect(mapStateToProps)(TitleView)
