import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import store from '../store.js';
import logo from '../vufindspa.svg'
import { Link as RLink } from 'react-router-dom';

class LogoAndSearchService extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var facets=''
        this.props.search.facets.forEach(f => facets+="&facet%5B%5D="+f);

        if ( this.props.flags.loading===true || this.props.flags.appending===true ) {

            console.log("FETCHER")
            console.log(this.props.flags)

            var page = this.props.search.page
            if(this.props.flags.appending) {
                page = page + 1
            }

            var url =   this.props.search.base +
                        "?lookfor=" + this.props.search.lookfor +
                        facets +
                        this.props.search.filter.join('') +
                        "&type=" + this.props.search.type +
                        "&sort=" + this.props.search.sort +
                        "&page=" + page +
                        "&limit=" + this.props.search.limit +
                        "&prettyPrint=false&lng=en"

            console.log("querying "+url)

            fetch(url)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    if('records' in data) {
                        if(this.props.flags.appending===true) {
                            store.dispatch({type: 'APPEND_RESULTS',data: { results: data }})
                        } else if(this.props.flags.loading===true) {
                            store.dispatch({type: 'SET_RESULTS',data: { results: data }})
                        }
                    } else {
                        store.dispatch({type: 'SET_FLAGS',data: {
                            loading: false,
                            appending: false,
                            endofresults: true
                        }})
                    }
                })
                .catch(console.log)
        }

        if(this.props.item_id!==false && this.props.item_data===false) {
            var url = "https://vufind.org/advanced_demo/api/v1/record?id=" +
                this.props.item_id +
                "&prettyPrint=false&lng=en"
            console.log("querying "+url)
            fetch(url)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    store.dispatch({type: 'SET_ITEM_DATA',data: { item_data: data }});
                })
                .catch(console.log)
        }

        return (
            <RLink to="/" className="logoimg">
              <img src={logo} className="logoimg" />
            </RLink>
        );
    }

}


function mapStateToProps(state) {
    return {
        search: state.search,
        flags: state.flags,
        item_id: state.item_id,
        item_data: state.item_data
    }
}

export default connect(mapStateToProps)(LogoAndSearchService)
