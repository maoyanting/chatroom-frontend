import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'dva/dynamic';
import { Route, Switch, Redirect, routerRedux } from 'dva/router';
import App from './routes/app';

const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  });
  const routes = [
    {
      path: '/toLogin',
      models: () => [import('./models/login')],
      component: () => import('./routes/login'),
    }, {
      path: '/chat',
      models: () => [import('./models/chat')],
      component: () => import('./routes/chat'),
    }, {
      path: '/home',
      component: () => import('./routes/homePage'),
    }, {
      path: '/toRegister',
      models: () => [import('./models/register')],
      component: () => import('./routes/register'),
    },
  ]
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/home" />)} />
          {
          routes.map(({ path, ...dynamics }, key) => (
            <Route
              key={key} exact path={path} component={dynamic({ app, ...dynamics })}
            />
          ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
