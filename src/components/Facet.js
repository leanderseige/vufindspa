import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import store from '../store.js';
import url from 'url';

class Facet extends React.Component {

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _handleClick(query) {
        var filter = query.match(/&filter[^&]+/gi)
        console.log(filter)
        store.dispatch({type: 'ADD_SEARCH_FILTER',data: { filter: filter }});
    }

    _onChange(e,x) {
      console.log(x)

    }

    render() {

        const labels = {
            author_facet: 'Author',
            genre_facet: 'Genre',
            topic_facet: 'Topic',
            publishDate: 'Year',
            format: 'Format'
        }

        var output = [];

        for (var key in this.props.data) {
            let urlObject = url.parse(this.props.data[key].href,false);
            output.push(
                <span key={key}>
                    <Link color="primary"
                      onClick={() => {this._handleClick(urlObject.query)}}>{this.props.data[key].value}
                    </Link>
                    ({this.props.data[key].count})<br /><br />
                </span>
            );
        }

        return (
          <Accordion defaultExpanded={false} className="listitem" key={this.props.name} onChange={this._onChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{labels[this.props.name]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {output}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
    }

}


function mapStateToProps(state) {
    return {
        results: state.results,
        flags:  state.flags
    }
}

export default connect(mapStateToProps)(Facet)
