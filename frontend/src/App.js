import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '~/config/ReactotronConfig';

import history from './services/history';
import Routes from './routes';
import GlobaStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobaStyle />
      <ToastContainer autoClose={2500} />
    </Router>
  );
}

export default App;
