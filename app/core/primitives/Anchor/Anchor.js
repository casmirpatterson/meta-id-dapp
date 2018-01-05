import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledAnchor
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledAnchor = styled('a')`
  color: ${({ color, theme }) => theme[color] || color};
  cursor: ${({ cursor }) => cursor};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Anchor = ({ children, ...props }) => (
  <StyledAnchor {...props}>{children}</StyledAnchor>
)

/**
 * @name defaultProps
 * @memberof Anchor
 * @desc Primitive's default properties
 */
Anchor.defaultProps = {
  color: 'inherit',
  cursor: 'pointer',
}

/**
 * @name propTypes
 * @memberof Anchor
 * @desc Primitive's prop type definitions
 */
Anchor.propTypes = {
  /** Color */
  color: PropTypes.string,
  /** Cursor */
  cursor: PropTypes.string,
}

export default Anchor
