import React from 'react';
import './App.css';
import './styles.scss';
import './styles-mobile.scss';
import SplashScreen from './components/SplashScreen.js';
import SearchBar from './components/SearchBar.js';
import StatusBar from './components/StatusBar.js';
import ResultList from './components/ResultList.js';
import FacetList from './components/FacetList.js';
import RecordView from './components/RecordView.js';
import BookmarksView from './components/BookmarksView.js';
import SettingsDialog from './components/SettingsDialog.js';
import MobileFacets from './components/MobileFacets.js';
import LoaderOverlay from './components/LoaderOverlay.js';
import LogoAndSearchService from './components/LogoAndSearchService.js'
import { Redirect, Link, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
        <Switch>
            <Route exact path="/" component={SplashScreen} />
            <Route path="/">
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
                    <Switch>
                        <Route exact path="/find" component={ResultList} />
                        <Route path="/record" component={RecordView} />
                    </Switch>
                    </div>
                    <div className="Facets">
                        <FacetList />
                    </div>
                    <div className="TitleView">
                        <BookmarksView />
                        <MobileFacets />
                        <LoaderOverlay />
                        <SettingsDialog />
                    </div>
                </div>
            </Route>
        </Switch>
    </Provider>
  );
}

export default App;
