import { createStore, compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';

function reducer(state, action) {
    switch(action.type) {

        case 'SET_SEARCH_LOOKFOR': {
            var temp_search = Object.assign({}, state.search)
            temp_search.lookfor = action.data.lookfor
            temp_search.type = action.data.type
            temp_search.page = 1
            temp_search.filter = []
            var temp_flags = Object.assign({}, state.flags, { loading: true, appending: false, endofresults: false } );
            return Object.assign({}, state, { search: temp_search, flags: temp_flags } );
        }

        case 'SET_SEARCH_PAGE': {
            var temp_search = Object.assign({}, state.search)
            temp_search.page = action.data.page
            return Object.assign({}, state, { search: temp_search } );
        }

        case 'INC_SEARCH_LIMIT': {
            var temp_search = Object.assign({}, state.search)
            temp_search.limit = temp_search.limit + 20
            return Object.assign({}, state, { search: temp_search } );
        }

        case 'ADD_SEARCH_FILTER': {
            var temp_search = Object.assign({}, state.search)
            temp_search.filter = [...action.data.filter, ...temp_search.filter]
            temp_search.page = 1
            var temp_flags = Object.assign({}, state.flags, { loading: true, appending: false, endofresults: false } );
            return Object.assign({}, state, { search: temp_search, flags: temp_flags } );
        }

        case 'CLR_SEARCH_FILTER': {
            var temp_search = Object.assign({}, state.search)
            temp_search.filter = []
            var temp_flags = Object.assign({}, state.flags, { loading: true, appending: false, endofresults: false } );
            return Object.assign({}, state, { search: temp_search, flags: temp_flags } );
        }

        case 'REM_SEARCH_FILTER': {
            var temp_search = Object.assign({}, state.search)
            var new_filter = []
            temp_search.filter.forEach((f, i) => {
                if(f!=action.data.filter) {
                    new_filter.push(f)
                }
            })
            temp_search.filter = new_filter
            var temp_flags = Object.assign({}, state.flags, { loading: true, appending: false, endofresults: false } );
            return Object.assign({}, state, { search: temp_search, flags: temp_flags } );
        }

        case 'SET_RESULTS': {
            var temp_results = Object.assign({}, action.data.results)
            var temp_flags = Object.assign({}, state.flags, { loading: false, appending: false, endofresults: false } );
            return Object.assign({}, state, { results: temp_results, flags: temp_flags } );
        }

        case 'APPEND_RESULTS': {
            var temp_results = Object.assign({}, state.results)
            temp_results.records = state.results.records.concat(action.data.results.records)
            var temp_flags = Object.assign({}, state.flags, { loading: false, appending: false } );
            var temp_search = Object.assign({}, state.search)
            temp_search.page = temp_search.page+1
            return Object.assign({}, state, {
                results: temp_results,
                flags: temp_flags,
                search: temp_search
            } );
        }

        case 'SET_ITEM_DATA': {
            return Object.assign({}, state, { item_data: action.data.item_data } );
        }

        case 'SET_ITEM_ID': {
            return Object.assign({}, state, {
                item_id: action.data.id,
                item_data: false
            } );
        }

        case 'SET_FLAGS': {
            var temp_flags = Object.assign({}, state.flags, action.data );
            return Object.assign({}, state, { flags: temp_flags } );
        }

        case 'ADD_BOOKMARK': {
            var temp_bms = Object.assign({}, state.bookmarks, action.data)
            return Object.assign({}, state, { bookmarks: temp_bms } );
        }

        case 'REM_BOOKMARK': {
            var temp_bms = Object.assign({}, state.bookmarks)
            delete temp_bms[action.data.id]
            return Object.assign({}, state, { bookmarks: temp_bms } );
        }

        default : {
            return state
        }
    }
}

// https://vufind.org/advanced_demo/api/v1/
// https://api.finna.fi/api/v1/

const initial_state = {
    search: {
        base: 'https://api.finna.fi/api/v1/',
        lookfor: 'Shakespeare',
        type: 'AllFields',
        sort: 'relevance',
        page: 1,
        limit: 20,
        filter: [],
        facets: ['author_facet','genre_facet','topic_facet','publishDate'],
        field: ['id','authors','formats','series','subjects','title','urls','languages','fullRecord','publishDate']
    },
    results: {},
    item_id: false,
    item_data: false,
    flags: {
        loading: true,
        appending: false,
        bookmarkdialog: false,
        mobilefacets: false,
        endofresults: false
    },
    bookmarks: {}
}

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(reducer, initial_state, enhancers)

export default store
