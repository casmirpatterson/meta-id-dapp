import React from 'react'
import { Image } from 'jaak-primitives'

const Logo = ({ size = ['114px', 'auto'] }) => (
  <Image backgroundSize="contain" size={size} src="/img/meta-id.png" />
)

export default Logo
