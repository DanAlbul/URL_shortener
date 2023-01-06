import React from 'react';
import 'materialize-css';
import { useRoutes } from './routes.js';

function App() {
  const routes = useRoutes(false);
  return <div>{routes}</div>;
}

export default App;
