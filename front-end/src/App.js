import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Index from './Page/Index/Index';
import RK from './Page/tools/Ranking/RK';
import Login from './Page/Login/Login';
import Search from './Page/Search/Search';
import BackEnd from './Page/backend/BackEnd'
import TB from './Page/tools/topBar/TB';

function App() {
  return (
    <div className="App">
      
      <Router>
        <TB/>
        <Route exact path="/" component={Index}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Search" component={Search}/>
        <Route exact path="/BackEnd" component={BackEnd}/>
        <Route exact path="/BackEnd/:op" component={BackEnd}/>
      </Router>
    </div>
  );
}

export default App;
