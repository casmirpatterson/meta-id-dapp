import React from 'react'
import { Image } from 'jaak-primitives'

const Logo = ({ maxWidth = 'auto', size = ['114px', 'auto'] }) => (
  <Image
    backgroundSize="contain"
    margin={[0, 'auto']}
    size={size}
    style={{ maxWidth }}
    src="/img/meta-id.png"
  />
)

export default Logo
