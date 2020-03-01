import React from 'react';
import { Route } from 'react-router-dom';
import TableView from '../TableView/TableView';
import DetailsView from '../DetailsView/DetailsView';
import './App.css';

const App = () => (
  <div>
    <Route exact path="/" component={TableView} />
    <Route exact path="/:name/:id" component={DetailsView} />
  </div>
);

export default App;
