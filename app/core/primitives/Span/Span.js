import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledSpan
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledSpan = styled('span')`
  color: ${({ color, theme }) => theme[color] || color};
  font-weight: ${({ fontWeight }) => fontWeight};
`

/**
 * @namespace Span
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Span = ({ children, ...props }) => (
  <StyledSpan {...props}>{children}</StyledSpan>
)

/**
 * @name defaultProps
 * @memberof Span
 * @desc Primitive's default properties
 */
Span.defaultProps = {
  color: 'inherit',
  fontWeight: 'inherit',
}

/**
 * @name propTypes
 * @memberof Span
 * @desc Primitive's prop type definitions
 */
Span.propTypes = {
  /** Color */
  color: PropTypes.string,
  /** Font weight */
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Span
