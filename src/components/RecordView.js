import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Redirect, Route, Switch } from "react-router-dom";
import Loader from 'react-loader-spinner'
import store from '../store.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ReactJson from 'react-json-view'
import { Link as RLink } from 'react-router-dom';

import { mrkToObject } from 'himarc';


const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px 0`,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit / 2,
    top: theme.spacing.unit / 2,
    color: theme.palette.grey[500],
  },
})


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

            var marc001 = "error"
            try {
              let domparser = new DOMParser()
              var xmlstring = this.props.item_data.records[0].fullRecord.replace(/xmlns=\"[^\"]+\"/g,'') // Sorry! FIXME
              let xml = domparser.parseFromString(xmlstring,'application/xml')
              var path ='//controlfield[@tag="001"]/text()'
              var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
              var result = nodes.iterateNext();
              marc001 = result.textContent
              // output.push(<h4>MARC21 Field 001: {result.textContent}</h4>)
            } catch(err) {
              console.log("error")
              console.log(err)
            }

            try {
                console.log(mrkToObject(this.props.item_data.records[0].fullRecord));
            } catch(err) {
                console.log("himarc error")
            }

            output.push(<h4>MARC21 Field 001: {marc001}</h4>)



            output.push(<ReactJson src={this.props.item_data} enableClipboard={false} />)

          } else {
            return (
                <Loader type="Oval" color="#ccc" height={100} width={100} className="allauto" />
            )
        }

      return (
            <div className="scrollable">
              <Button component={RLink} to="/find" size="small" variant="contained" color="primary">Close</Button>
              {output}
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
