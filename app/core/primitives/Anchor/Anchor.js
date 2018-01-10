import React from 'react'
import { margin } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledAnchor
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledAnchor = styled('a')`
  ${props => margin(...props.margin)};
  color: ${({ color, theme }) => theme[color] || color};
  cursor: ${({ cursor }) => cursor};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
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
  fontSize: 'inherit',
  fontWeight: 'inherit',
  margin: ['0'],
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
  /** Font size */
  fontSize: PropTypes.string,
  /** Font weight */
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** [Margin shorthand](https://polished.js.org/docs/#margin) */
  margin: PropTypes.array,
}

export default Anchor
