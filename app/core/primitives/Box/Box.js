import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box as BoxPrimitive } from 'jaak-primitives'

import { media } from 'core/style'

/**
 * @namespace StyledBox
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledBox = styled(BoxPrimitive)`
  border-color: ${({ borderColor, theme }) =>
    theme[borderColor] || borderColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};

  ${media.sm`
    flex: 0 0 100%;
  `};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Box = ({ children, ...props }) => (
  <StyledBox {...props}>{children}</StyledBox>
)

/**
 * @name defaultProps
 * @memberof Box
 * @desc Primitive's default properties
 */
Box.defaultProps = {
  borderColor: 'currentColor',
  borderRadius: '0px',
  borderStyle: 'none',
  borderWidth: '0px',
}

/**
 * @name propTypes
 * @memberof Box
 * @desc Primitive's prop type definitions
 */
Box.propTypes = {
  /** border colour */
  borderColor: PropTypes.string,
  /** border radius */
  borderRadius: PropTypes.string,
  /** border style */
  borderStyle: PropTypes.string,
  /** border width */
  borderWidth: PropTypes.string,
}

export default Box
