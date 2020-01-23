import React, { Component } from 'react';
import CatList from './api-handler';
import CatDetails from './api-details';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

class CatMain extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                 <Route path='/' exact component={CatList}/>
                 <Route path='/?breed=:id' exact component={CatDetails}/>
                 <Route path='/:id' exact component={CatDetails}/>
                </Switch>
            </Router>
         );
    }
  
}
 
export default CatMain;