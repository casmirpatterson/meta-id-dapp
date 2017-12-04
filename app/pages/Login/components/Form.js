import React from 'react'
import { compose, withState } from 'recompose'

import { readFileAsText } from 'core/util'

const Form = ({ onSubmit, keystore, setKeystore, password, setPassword }) => (
  <div>
    <input
      onChange={({ target: { value } }) => setPassword(value)}
      placeholder="Password"
      type="password"
      value={password}
    />

    <input
      onChange={({ target: { files: [file] } }) =>
        readFileAsText(file).then(setKeystore)
      }
      placeholder="Upload Keystore"
      type="file"
    />

    <button onClick={() => onSubmit({ keystore, password })}>Login</button>
  </div>
)

const enhance = compose(
  withState('keystore', 'setKeystore', null),
  withState('password', 'setPassword', '')
)

export default enhance(Form)
