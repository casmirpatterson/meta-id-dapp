import React from 'react'
import { margin, padding, size } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledHeader
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledHeader = styled.header`
  ${props => margin(...props.margin)};
  ${props => padding(...props.padding)};
  ${props => size(...props.size)};
  max-width: ${({ maxWidth }) => maxWidth};
`

/**
 * @namespace Header
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Header = ({ children, ...props }) => (
  <StyledHeader {...props}>{children}</StyledHeader>
)

/**
 * @name defaultProps
 * @memberof Header
 * @desc Primitive's default properties
 */
Header.defaultProps = {
  margin: ['0'],
  maxWidth: 'initial',
  padding: ['0'],
  size: ['auto'],
}

/**
 * @name propTypes
 * @memberof Header
 * @desc Primitive's prop type definitions
 */
Header.propTypes = {
  /** [Margin shorthand](https://polished.js.org/docs/#margin) */
  margin: PropTypes.array,
  /** Maximum width */
  maxWidth: PropTypes.string,
  /** [Padding shorthand](https://polished.js.org/docs/#padding) */
  padding: PropTypes.array,
  /** [Size shorthand](https://polished.js.org/docs/#size) */
  size: PropTypes.array,
}

export default Header
