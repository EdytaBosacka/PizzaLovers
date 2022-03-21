import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, StateMachineProvider } from "little-state-machine";
import MainPage from "./pages/MainPage";
import './App.css';
import 'antd/dist/antd.css';


function App() {

  createStore({});
 
  return (
    <StateMachineProvider>
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={MainPage}/>
          <Route path="/" component={LoginPage}/>
        </Switch>
      
      </Router>
    </div>
    </StateMachineProvider>
  );
}

export default App;
