import React from 'react'
import { Image } from 'core/primitives'

const Logo = ({ maxWidth = 'auto', size = ['114px', 'auto'] }) => (
  <Image
    backgroundSize="contain"
    margin={[0, 'auto']}
    maxWidth={maxWidth}
    size={size}
    src="img/meta-id.png"
  />
)

export default Logo
