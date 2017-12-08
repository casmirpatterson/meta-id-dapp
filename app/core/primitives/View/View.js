import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View as ViewPrimitive } from 'jaak-primitives'

/**
 * @namespace StyledView
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledView = styled(ViewPrimitive)`
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  max-width: ${({ maxWidth }) => maxWidth};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const View = ({ children, ...props }) => (
  <StyledView {...props}>{children}</StyledView>
)

/**
 * @name defaultProps
 * @memberof View
 * @desc Primitive's default properties
 */
View.defaultProps = {
  display: 'block',
  flexDirection: 'initial',
  maxWidth: 'initial',
}

/**
 * @name propTypes
 * @memberof View
 * @desc Primitive's prop type definitions
 */
View.propTypes = {
  /** Display */
  display: PropTypes.string,
  /** Flex direction */
  flexDirection: PropTypes.string,
  /** Maximum width */
  maxWidth: PropTypes.string,
}

export default View
