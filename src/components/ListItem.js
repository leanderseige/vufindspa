import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
      var urls = []
      for(var key in rec.urls) {
          urls.push(
              <Typography color="secondary">
              <Link color="secondary" href={rec.urls[key].url} target="_blank">{rec.urls[key].desc}</Link>
              </Typography>
          )
      }

      return (
        <Card>
            <CardContent>
                <Link  variant="subtitle1" color="primary" onClick={() => {this._handleOpenClick(rec.id)}}>{rec.title.replace(/\/$/g,'')}</Link>
                <Typography>{authors.join(', ')}</Typography>
                <Typography>{urls}</Typography>
            </CardContent>
        </Card>
      );
    }
}

function mapStateToProps(state) {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps)(ListItem)
