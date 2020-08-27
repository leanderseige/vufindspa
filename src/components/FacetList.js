import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Facet from './Facet.js';
import store from '../store.js';

class FacetList extends React.Component {

    constructor(props) {
        super(props);
        this.handleClear = this.handleClear.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleClear() {
        store.dispatch({type: 'CLR_SEARCH_FILTER'});
    }

    handleRemove(filter)  {
        store.dispatch({type: 'REM_SEARCH_FILTER',data: {
            filter: filter
        }});
    }


    render() {

        var output = [];

        if(this.props.search.filter.length>0) {
            output.push(
                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => {this.handleClear()}}>
                Remove All Filters
                </Button>
            )
        }

        this.props.search.filter.forEach((f, i) => {
            var label = decodeURI(f)
            label = label.split('"')
            label = label[1]
            label = label.replace(/\+/g,' ')
            output.push(
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => {this.handleRemove(f)}}>
                {label}
                </Button>
            );
        });

        for (var key in this.props.results.facets) {
            output.push(
                <Facet data={this.props.results.facets[key]} name={key} />
            );
        }

        return (
          <div>
            {output}
          </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        search: state.search,
        results: state.results
    }
}

export default connect(mapStateToProps)(FacetList)
