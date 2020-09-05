import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import ReactJson from 'react-json-view'
import { Link as RLink } from 'react-router-dom';
import store from '../store.js';
import ListItem from './ListItem.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

class SettingsDialog extends React.Component {

    constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        value: this.props.search.base
      }
    }

    handleClose() {
        console.log("close")
        store.dispatch({type: 'SET_SEARCH_BASE',data: { base: this.state.value }});
        store.dispatch({type: 'SET_FLAGS',data: { settingsdialog: false }});
    }

    handleChange(e) {
      console.log(e.target.value)
      this.setState( { value: e.target.value } )
    }

    render() {
        var open = this.props.flags.settingsdialog
        var output = []

        // output.push(<ReactJson src={this.props.bookmarks} enableClipboard={false} />)
        var count = 1
        for(var key in this.props.servers) {
          output.push(
            <FormControlLabel value={this.props.servers[key]} control={<Radio />} label={this.props.servers[key]} />
          )
          count++
        }

      return (
        <Dialog onClose={() => {this.handleClose()}} aria-labelledby="simple-dialog-title" open={open}>
          <DialogContent>
              <Typography variant="h3" gutterBottom>Settings</Typography>
              <Alert severity="warning">Permalinks work with the default server only!</Alert>
              <FormControl component="fieldset">
                  <RadioGroup aria-label="servers" value={this.state.value} name="servers" onChange={this.handleChange}>
                    {output}
                  </RadioGroup>
              </FormControl>
              <DialogActions>
                <Button onClick={() => {this.handleClose()}} size="small" variant="contained" color="primary">
                  OK
                </Button>
              </DialogActions>
            </DialogContent>
         </Dialog>
      );

    }
}

function mapStateToProps(state) {
    return {
        search: state.search,
        servers: state.servers,
        flags: state.flags
    }
}

export default connect(mapStateToProps)(SettingsDialog)
