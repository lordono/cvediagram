import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import './Main.css';

import { notification } from 'antd';

import history from '../../history';
// import FilterDrawer from '../Wireframe/FilterDrawer/FilterDrawer'
import FrameView from '../FrameView/FrameView'

const { Content} = Layout;

class Main extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  goGTMApprove = () => {
    notification.destroy();
    history.push('/app/gtm/request/?complete=pending');
  }
  goLTMApprove = () => {
    notification.destroy();
    history.push('/app/ltm/request/?complete=pending');
  }
  componentWillMount = () => {
    
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <FilterDrawer /> */}
        <Layout>
          <Content style={{ margin: '0 0px' }}>
            <Switch>
              <Route exact path={`/`} component={FrameView}/>
              <Route component={() => <h1 style={{fontWeight: "700", marginBottom: 5}}><Icon type="close-circle-o" style={{marginRight: 10}}/>Page Not Found</h1>} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Main.propTypes = {
  match: PropTypes.object.isRequired
};

export default Main;
