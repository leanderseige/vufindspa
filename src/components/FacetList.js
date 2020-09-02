import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from 'react-loader-spinner'
import Facet from './Facet.js';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import store from '../store.js';

class FacetList extends React.Component {

    constructor(props) {
        super(props);
        this.handleClear = this.handleClear.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleBarClick = this.handleBarClick.bind(this);
    }

    handleClear() {
        store.dispatch({type: 'CLR_SEARCH_FILTER'});
    }

    handleRemove(filter)  {
        store.dispatch({type: 'REM_SEARCH_FILTER',data: { filter: filter}});
    }


    handleBarClick(e) {
      console.log(e)
      store.dispatch({type: 'ADD_SEARCH_FILTER',data: { filter: ["&filter%5B%5D=publishDate%3A%22"+e.activeLabel+"%22"] }});
    }

    compare(a, b) {
      const aa = a.value;
      const bb = b.value;

      let comparison = 0;
      if (aa > bb) {
        comparison = 1;
      } else if (aa < bb) {
        comparison = -1;
      }
      return comparison;
    }

    render() {

        if(this.props.flags.loading) {
            return(<Loader type="Oval" color="#ccc" height={100} width={100} className="allauto" />)
        }
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

        try {
          if(Object.keys(this.props.results.facets.publishDate).length>1) {
            var fpd = JSON.parse(JSON.stringify(this.props.results.facets.publishDate))
            fpd = fpd.sort(this.compare)
            output.push(
              <ResponsiveContainer width="95%" height={200}>
              <BarChart data={fpd} onClick={this.handleBarClick}>>
                <XAxis dataKey="translated" />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
              </ResponsiveContainer>
            )
          }
        } catch(e) {}

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
        results: state.results,
        flags: state.flags
    }
}

export default connect(mapStateToProps)(FacetList)
