import React , { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Panel from './components/pages/Panel';
import Register from './components/pages/RegisterUser';
import LogIn from './components/pages/LogIn';
import Nav from './components/layout/Nav';
import Alert from './components/layout/Alert';
import Post from './components/pages/Posts';
import ResetPassword from './components/pages/ResetPassword';
import EditPost from './components/pages/EditPost';

import UserState from './context/user/UserState';
import AlertState from './context/alert/AlertState';


import './App.css';
const App = () => {
    return (
 
      <UserState>
        <AlertState>
            <Router>
                  <Fragment>
                        <Nav/>
                              <Alert />
                                  <Switch>
                                        <Route exact path='/panel' component={Panel} />
                                        <Route exact path='/register' component={Register} />
                                        <Route exact path='/logIn' component={LogIn} />
                                        <Route exact path='/newpost' component={Post} />
                                        <Route exact path='/change password/:userName' component={ResetPassword} />
                                        <Route exact path='/post/:post_id/edit' component={EditPost} />
                                  </Switch>
                  </Fragment>
             </Router>
          </AlertState>
     </UserState>
   
    )
}

export default App
