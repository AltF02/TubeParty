import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import './breakpoints.scss'

import JoinRoom from './views/Join/JoinRoom'
import Room from './views/Room/Room'

function App() {
  return (
    <div>
      <ReactNotification />
      <Router>
          <Switch>
              <Route path='/' exact component={JoinRoom} />
              <Route path='/room/:roomName' component={Room}/>
              <Redirect to='/'/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
