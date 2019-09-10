import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '~/pages/Login';
import Servers from '~/pages/Servers';
import Versions from '~/pages/Versions';
import Users from '~/pages/Users';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/servers" exact component={Servers} />
      <Route path="/versions" exact component={Versions} />
      <Route path="/users" exact component={Users} />
    </Switch>
  );
}
