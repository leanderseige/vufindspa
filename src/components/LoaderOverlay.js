import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import Loader from 'react-loader-spinner'


class LoaderOverlay extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.flags.loading===true) {
          return (
            <div className="overlay">
              <Loader type="Oval" color="#ccc" height={100} width={100} className="allauto" />
            </div>
          );
        } else {
          return (<div />);
        }
    }

}


function mapStateToProps(state) {
    return {
      flags: state.flags
    }
}

export default connect(mapStateToProps)(LoaderOverlay)
