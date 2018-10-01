import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
// import Animate from 'rc-animate';
import './NotFound.css';
import history from '../../history';

class NotFound extends Component {
  render() {
    return (
      <div className="login-page">
        {/* <Animate
          transitionAppear
          transitionName="fade"
        > */}
          <div className="login-form-layout not-found-form">
            <h1 style={{color: "#e6f7ff", fontWeight: "700", marginBottom: 5}}><Icon type="close-circle-o" style={{marginRight: 10}}/>Page Not Found</h1>
            <Button style={{width: '85%'}} onClick={() => history.push('/app/dashboard')}>Click to go back</Button>
          </div>
        {/* </Animate> */}
      </div>
    );
  }
}

export default NotFound;
