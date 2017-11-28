import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { configureStore } from 'core/store'

const store = configureStore()

export default class Root extends Component {
  componentWillMount() {
    console.log('💂‍ M E T A - I D  Ð A P P 💂')
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>META-ID ÐApp</h1>
        </div>
      </Provider>
    )
  }
}
