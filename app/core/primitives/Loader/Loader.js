import React from 'react'
import { size } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { animation } from 'core/style'

/**
 * @namespace StyledLoader
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledLoader = styled.div`
  ${props => size(...props.size)};
  animation: ${animation.rotate360} 0.6s linear infinite;
  background-size: ${({ backgroundSize }) => backgroundSize};
  border-color: ${({ borderColor, theme }) =>
    `transparent transparent ${theme[borderColor]} transparent`};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
  transform-origin: ${({ transformOrigin }) => transformOrigin};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Loader = ({ children, ...props }) => (
  <StyledLoader {...props}>{children}</StyledLoader>
)

/**
 * @name defaultProps
 * @memberof Loader
 * @desc Primitive's default properties
 */
Loader.defaultProps = {
  backgroundSize: '100% auto',
  borderColor: 'accent',
  borderStyle: 'solid',
  borderWidth: '0 10px 17.3px 10px',
  size: [0],
  transformOrigin: 'origin',
}

/**
 * @name propTypes
 * @memberof Loader
 * @desc Primitive's prop type definitions
 */
Loader.propTypes = {
  /** Background size */
  backgroundSize: PropTypes.string,
  /** Border colour */
  borderColor: PropTypes.string,
  /** Border style */
  borderStyle: PropTypes.string,
  /** Border width */
  borderWidth: PropTypes.string,
  /** [Size shorthand](https://polished.js.org/docs/#size) */
  size: PropTypes.array,
  /** Transform origin */
  transformOrigin: PropTypes.string,
}

export default Loader
