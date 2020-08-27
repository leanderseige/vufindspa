import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

class ListItem extends React.Component {

    constructor(props) {
      super(props);
      this._handleOpenClick = this._handleOpenClick.bind(this);
    }

    _handleOpenClick(id) {
        console.log(id)
        store.dispatch({ type: 'SET_ITEM_ID',data: { id: id } });
        var url =   "https://vufind.org/advanced_demo/api/v1/record?id="+id+"&prettyPrint=false&lng=en"
        console.log("querying "+url)
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                store.dispatch({type: 'SET_ITEM_DATA',data: { item_data: data }});
            })
            .catch(console.log)
    }

    render() {
      var idx = this.props.idx
      var rec = Object.assign({},this.props.results.records[idx])
      var authors = []
      for(var key in rec.authors.primary) {
          authors.push(key)
      }
      for(var key in rec.authors.secondary) {
          authors.push(key)
      }

      return (
        <div className="listitem" key={idx} >
            <h3>
                <a onClick={() => {this._handleOpenClick(rec.id)}}>{rec.title.replace(/\/$/g,'')}</a>
            </h3>
            <p>{authors.join(', ')}</p>
        </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps)(ListItem)
