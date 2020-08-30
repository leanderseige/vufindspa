import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Redirect, Link, Route, Switch } from "react-router-dom";
import Loader from 'react-loader-spinner'
import store from '../store.js';

class RecordView extends React.Component {

    constructor(props) {
      super(props);
      console.log("here is xyz")
      console.log(this.props)
    }

    render() {

        var output = []
        if(this.props.item_id===false) {
            var id = this.props.location.pathname.split('/')[2]
            console.log("ID: "+id)
            store.dispatch({ type: 'SET_ITEM_ID',data: { id: id } });
        }
        if(this.props.item_data!==false) {
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
        } else {
            output.push(
                <Loader type="Oval" color="#ccc" height={100} width={100} className="allauto" />
            )
        }

      return (
            <div className="scrollable">
            {output}
            <Link to="/">
                CLOSE
            </Link>
            </div>
      );

    }
}

function mapStateToProps(state) {
    return {
        item_id: state.item_id,
        item_data: state.item_data
    }
}

export default connect(mapStateToProps)(RecordView)
