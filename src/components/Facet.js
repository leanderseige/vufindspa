import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import store from '../store.js';
import url from 'url';

class Facet extends React.Component {

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(query) {
        var filter = query.match(/&filter[^&]+/gi)
        console.log(filter)
        store.dispatch({type: 'ADD_SEARCH_FILTER',data: {
            filter: filter
        }});
    }

    render() {

        var output = [];

        for (var key in this.props.data) {
            let urlObject = url.parse(this.props.data[key].href,false);
            output.push(
                <p>
                    <a onClick={() => {this._handleClick(urlObject.query)}}>{this.props.data[key].value}</a>
                    ({this.props.data[key].count})
                </p>
            );
        }

        return (
          <div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{this.props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>{output}</div>
            </AccordionDetails>
        </Accordion>
        </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps)(Facet)
