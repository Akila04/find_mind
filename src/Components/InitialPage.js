import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Loginpage from './Loginpage';
import Signinpage from './Signinpage';
import Taskboard from './Taskboard';

class InitialPage extends Component{
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Loginpage />
                        </Route>
                        <Route path="/login" exact>
                            <Loginpage />
                        </Route>
                        <Route path="/signin" exact>
                            <Signinpage />
                        </Route>
                        <Route path="/taskboard" exact>
                            <Taskboard />
                        </Route>
                    </Switch>
                </Router>    
            </div>
        );
    }
}
export default InitialPage;