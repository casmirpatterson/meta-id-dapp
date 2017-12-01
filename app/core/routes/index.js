import React from 'react'
import { makeRouteConfig, Route } from 'found'

import App from 'core/containers/App'
import routes from 'core/routes/config'
import * as pages from 'pages'

export { routes }

export default makeRouteConfig(
  <Route Component={App}>
    <Route path={routes.home.path} Component={pages.Home} />

    <Route
      path={`${routes.claim.path}/${routes.claim.params}`}
      Component={pages.Claim}
    />

    <Route path={routes.login.path} Component={pages.Login} />

    <Route path={routes.register.path} Component={pages.Register} />

    <Route
      path={`${routes.search.path}/${routes.search.params}`}
      Component={pages.Search}
    />
  </Route>
)
