import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import store from '../store.js';

class ListItem extends React.Component {

    constructor(props) {
      super(props);
      this._handleOpenClick = this._handleOpenClick.bind(this);
      this._handleAddBookClick = this._handleAddBookClick.bind(this);
      this._handleRemBookClick = this._handleRemBookClick.bind(this);
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

    _handleAddBookClick(rec) {
        console.log(rec.id)
        var data = {}
        data[rec.id] = Object.assign({},rec)
        store.dispatch({ type: 'ADD_BOOKMARK', data: data });
    }

    _handleRemBookClick(rec) {
        store.dispatch({ type: 'REM_BOOKMARK', data: {id: rec.id} });
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
      if(rec.id in this.props.bookmarks) {
          var bmicon =
              <IconButton aria-label="bookmark" onClick={() => {this._handleRemBookClick(rec)}}>
                <BookmarkIcon />
              </IconButton>
      } else {
          var bmicon =
              <IconButton aria-label="bookmark" onClick={() => {this._handleAddBookClick(rec)}}>
                  <BookmarkBorderIcon />
              </IconButton>
      }

      return (
        <Card className="listitem">
            <CardHeader
                avatar={
                  <Avatar aria-label="recipe">
                    {rec.formats[0].charAt(0)}
                  </Avatar>
                }
                action={bmicon}
                title={
                    <Link  variant="subtitle1" color="primary" onClick={() => {this._handleOpenClick(rec.id)}}>
                        {this.props.count}. {rec.title.replace(/\/$/g,'')}
                    </Link>
                }
                subheader={
                    <span>{authors.join(', ')}</span>
                }
              />
            <CardContent>
                <Typography>{urls}</Typography>
            </CardContent>
        </Card>
      );
    }
}

function mapStateToProps(state) {
    return {
        results: state.results,
        bookmarks: state.bookmarks
    }
}

export default connect(mapStateToProps)(ListItem)
