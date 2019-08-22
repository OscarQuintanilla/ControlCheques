import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './pages/Login';
import ListarCheques from './pages/ListarCheques';
import InsertarCheques from './pages/InsetarCheques';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/logIn' component={Login} />
        <Route exact path='/cheques/listar' component={ListarCheques} />
        <Route exact path='/cheques/registrar' component={InsertarCheques} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
