import { createStore, compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';

function reducer(state, action) {
    switch(action.type) {

        case 'SET_SEARCH_LOOKFOR': {
            var temp_search = Object.assign({}, state.search)
            temp_search.lookfor = action.data.lookfor
            temp_search.type = action.data.type
            temp_search.filter = []
            return Object.assign({}, state, { search: temp_search } );
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
            return Object.assign({}, state, { search: temp_search } );
        }

        case 'CLR_SEARCH_FILTER': {
            var temp_search = Object.assign({}, state.search)
            temp_search.filter = []
            return Object.assign({}, state, { search: temp_search } );
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
            return Object.assign({}, state, { search: temp_search } );
        }

        case 'SET_RESULTS': {
            var temp_results = Object.assign({}, action.data.results)
            return Object.assign({}, state, { results: temp_results } );
        }

        case 'SET_ITEM_DATA': {
            return Object.assign({}, state, { item_data: action.data.item_data } );
        }

        case 'SET_ITEM_ID': {
            return Object.assign({}, state, { item_id: action.data.id } );
        }

        default : {
            return state
        }
    }
}

const initial_state = {
    search: {
        lookfor: '',
        type: 'AllFields',
        sort: 'relevance',
        page: 1,
        limit: 20,
        filter: [],
        facets: ['author_facet','genre_facet','topic_facet']
    },
    results: {},
    item_id: false,
    item_data: false
}

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(reducer, initial_state, enhancers)

export default store
