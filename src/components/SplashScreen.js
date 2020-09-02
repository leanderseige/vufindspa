import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import SearchBar from './SearchBar.js';
import logo from '../vufindspa.svg'


class SplashScreen extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div class="SplashScreen">
            <SearchBar />
            <Box color="text.info" className="bottomline">{this.props.search.base}</Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(SplashScreen)
