import React, { Fragment } from 'react'
import { shared } from 'meta.js'

import { Span } from 'core/primitives'
import { metaId } from 'core/util'

const MetaIdDisplay = ({ username }) => (
  <Fragment>
    <Span color="accent">{metaId.getNameFromUsername(username)}</Span>
    <Span color="grey">{shared.META_ID_USERNAME_SUFFIX}</Span>
  </Fragment>
)

export default MetaIdDisplay
