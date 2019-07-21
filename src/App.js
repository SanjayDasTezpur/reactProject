import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Main from './Main';
import FirstPage from './FirstPage';

function App() {
  return (
    <div>
        <Route exact path="/" component={Main} />
        <Route path="/user/:userId" component={FirstPage} />
    </div>

  );
}

export default App;
