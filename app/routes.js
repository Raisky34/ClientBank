import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import Operations from './components/Operations';
import Products from './components/Products';
import OperationHistory from './components/OperationHistory';
import MobileTransaction from './components/Operations/Mobile/mobileTransaction';
import Admin from './components/Admin';
import AdminBox from './components/AdminBox';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute authorize={['user', 'admin']} component={Home} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route authorize={['admin']} component={Admin} onLeave={clearMessages}>
        <Route component={AdminBox} path="/adminbox" />
      </Route>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/products" component={Products} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/operations" component={Operations} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/history" component={OperationHistory} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/operations/phone" component={MobileTransaction} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
