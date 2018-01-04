import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from 'jaak-primitives'

/**
 * @namespace StyledHeaderLink
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledHeaderLink = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
  cursor: ${({ cursor }) => cursor};

  ${({ active, theme }) =>
    active &&
    `
    color: ${theme.accent};
    text-decoration: underline;
  `} &:hover, &:focus {
    color: ${({ theme }) => theme.accent};
  }
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const HeaderLink = ({ children, ...props }) => (
  <StyledHeaderLink {...props}>{children}</StyledHeaderLink>
)

/**
 * @name defaultProps
 * @memberof HeaderLink
 * @desc Primitive's default properties
 */
HeaderLink.defaultProps = {
  activePropName: 'active',
  color: 'white',
  cursor: 'pointer',
}

/**
 * @name propTypes
 * @memberof HeaderLink
 * @desc Primitive's prop type definitions
 */
HeaderLink.propTypes = {
  /** Name of prop to inject when Link is active */
  activePropName: PropTypes.string,
  /** Color */
  color: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
}

export default HeaderLink
