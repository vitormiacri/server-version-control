import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Routes';
import Login from '~/pages/Login';
import Servers from '~/pages/Servers';
import Versions from '~/pages/Versions';
import Users from '~/pages/Users';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/servers" exact component={Servers} isPrivate />
      <Route path="/versions" exact component={Versions} isPrivate />
      <Route path="/users" exact component={Users} isPrivate />
    </Switch>
  );
}
