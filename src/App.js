import logo from './logo.svg';
import './App.css';
import Admin from './components/Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users';

function App() {
  return (
     <Router>
      <div className="app">
        <Switch>
        
          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/">
            <Users />
          </Route>

        </Switch>
      </div> 
    </Router>
  );
}

export default App;
