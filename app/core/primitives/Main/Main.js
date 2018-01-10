import React from 'react'
import { size } from 'polished'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledMain
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledMain = styled.main`
  ${props => size(...props.size)};
  flex: ${({ flex }) => flex};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Main = ({ children, ...props }) => (
  <StyledMain {...props}>{children}</StyledMain>
)

/**
 * @name defaultProps
 * @memberof Main
 * @desc Primitive's default properties
 */
Main.defaultProps = {
  flex: '1 0 auto',
  size: ['100%', 'auto'],
}

/**
 * @name propTypes
 * @memberof Main
 * @desc Primitive's prop type definitions
 */
Main.propTypes = {
  /** Flex */
  flex: PropTypes.string,
  /** [Size shorthand](https://polished.js.org/docs/#size) */
  size: PropTypes.array,
}

export default Main
