import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Anchor from '../Anchor'

/**
 * @namespace StyledHeaderLink
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledHeaderLink = styled(Anchor)`
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
  fontSize: '14px',
  fontWeight: 700,
  margin: [0, 0, 0, '32px'],
}

/**
 * @name propTypes
 * @memberof HeaderLink
 * @desc Primitive's prop type definitions
 */
HeaderLink.propTypes = {
  /** Name of prop to inject when Link is active */
  activePropName: PropTypes.string,
}

export default HeaderLink
