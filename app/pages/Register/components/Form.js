import React from 'react'
import { compose, withState } from 'recompose'

import { readFileAsText } from 'core/util'

const Form = ({
  onSubmit,
  keystore,
  setKeystore,
  password,
  setPassword,
  username,
  setUsername,
}) => (
  <div>
    <input
      onChange={({ target: { value } }) => setUsername(value)}
      placeholder="Username"
      type="text"
      value={username}
    />

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

    <button onClick={() => onSubmit({ keystore, password, username })}>
      Register
    </button>
  </div>
)

const enhance = compose(
  withState('keystore', 'setKeystore', null),
  withState('password', 'setPassword', ''),
  withState('username', 'setUsername', '')
)

export default enhance(Form)
