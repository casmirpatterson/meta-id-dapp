import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @namespace StyledFooter
 * @desc styled-component 💅
 * @return {Function} React component
 */
const StyledFooter = styled.footer`
  flex: ${({ flex }) => flex};
  text-align: ${({ textAlign }) => textAlign};
`

/**
 * @namespace Box
 * @desc Primitive component
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @return {Function} React component
 */
const Footer = ({ children, ...props }) => (
  <StyledFooter {...props}>{children}</StyledFooter>
)

/**
 * @name defaultProps
 * @memberof Footer
 * @desc Primitive's default properties
 */
Footer.defaultProps = {
  flex: 'none',
  textAlign: 'center',
}

/**
 * @name propTypes
 * @memberof Footer
 * @desc Primitive's prop type definitions
 */
Footer.propTypes = {
  /** Flex */
  flex: PropTypes.string,
  /** Text align */
  textAlign: PropTypes.string,
}

export default Footer
