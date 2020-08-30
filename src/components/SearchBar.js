import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RLink } from 'react-router-dom';


class SearchBar extends React.Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
      this._handleSelectChange = this._handleSelectChange.bind(this);
      this._handleButtonClick = this._handleButtonClick.bind(this);
      this.state = {
          selectValue: "AllFields",
          textFieldValue: ""
      };
  }

  handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      this.props.addCallback(data.get('input_add'));
  }

  _handleTextFieldChange(e) {
      this.setState({
          textFieldValue: e.target.value
      });
  }

  _handleSelectChange(e) {
      this.setState({
          selectValue: e.target.value
      });
  }

  _handleButtonClick(e) {
      console.log(this.state.textFieldValue);
      store.dispatch({ type: 'SET_FLAGS', data: { loading: true }})
      store.dispatch({
          type: 'SET_SEARCH_LOOKFOR',
          data: {
              lookfor: this.state.textFieldValue,
              type: this.state.selectValue
          }
      });
  }

  componentDidMount() {
  }

  render() {

    return (
      <div class="allauto">
        <TextField
            InputProps={{className: "stdui"}}
            size="small" id="outlined-basic" label="Search" variant="outlined"
            onChange={this._handleTextFieldChange}
            defaultValue={this.props.search.lookfor}
        />
        <Select
            variant="outlined"
            className="stdui"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.selectValue}
            onChange={this._handleSelectChange}
        >
          <MenuItem value={"AllFields"}>AllFields</MenuItem>
          <MenuItem value={"Title"}>Title</MenuItem>
          <MenuItem value={"Author"}>Author</MenuItem>
        </Select>
        <Button
            component={ RLink }
            className="stdui" to="/find" size="small" variant="contained" color="primary"
            onClick={this._handleButtonClick}
        >
            Find
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(SearchBar)
