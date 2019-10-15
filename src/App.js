import React from 'react'
import { Layout, Menu } from 'antd';
import LoginForm from './components/login'
import HotelsList from './components/hotels'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'


import './App.css'
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/hotels">Hotels</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>

            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/hotels" component={HotelsList} />

              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>HD Design ©2019 Created by Harsh</Footer>
        </Layout>

      </div>
    </BrowserRouter>
  );
}


export default App;
