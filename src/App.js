import React from 'react';
import './App.css';
import './styles.scss';
import './styles-mobile.scss';
import SearchBar from './components/SearchBar.js';
import StatusBar from './components/StatusBar.js';
import ResultList from './components/ResultList.js';
import FacetList from './components/FacetList.js';
import TitleView from './components/TitleView.js';
import BookmarksView from './components/BookmarksView.js';
import LogoAndSearchService from './components/LogoAndSearchService.js'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
        <div className="App">
            <div className="Logo">
                <LogoAndSearchService />
            </div>
            <div className="SearchBar" >
                <SearchBar />
            </div>
            <div className="StatusBar" >
                <StatusBar />
            </div>
            <div className="ResultList" >
                <ResultList />
            </div>
            <div className="Facets">
                <FacetList />
            </div>
            <div className="TitleView">
                <TitleView />
                <BookmarksView />
            </div>
        </div>
    </Provider>
  );
}

export default App;
