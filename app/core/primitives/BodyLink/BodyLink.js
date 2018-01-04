import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from 'jaak-primitives'

/**
 * @namespace StyledBodyLink
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledBodyLink = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
  cursor: ${({ cursor }) => cursor};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const BodyLink = ({ children, ...props }) => (
  <StyledBodyLink {...props}>{children}</StyledBodyLink>
)

/**
 * @name defaultProps
 * @memberof BodyLink
 * @desc Primitive's default properties
 */
BodyLink.defaultProps = {
  activePropName: 'active',
  color: 'accent',
  cursor: 'pointer',
}

/**
 * @name propTypes
 * @memberof BodyLink
 * @desc Primitive's prop type definitions
 */
BodyLink.propTypes = {
  /** Name of prop to inject when Link is active */
  activePropName: PropTypes.string,
  /** Color */
  color: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
}

export default BodyLink
