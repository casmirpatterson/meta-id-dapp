import React, { Component } from 'react'

import { Link } from 'core/components'
import { routes } from 'core/routes'
import * as Components from './components'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>META-ID ÐApp</h1>

        <Components.Search />

        <Link to={routes.register.path}>
          <button>Register</button>
        </Link>

        <Link to={routes.login.path}>
          <button>Login</button>
        </Link>
      </div>
    )
  }
}

export default Home
