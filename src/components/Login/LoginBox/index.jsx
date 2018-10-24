import React from 'react'
import styled from 'styled-components'

import Logo from '../../../assets/Logo'
import theme from '../../../theme'

/*
*****************
STYLED COMPONENTS
*****************
*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colours.white};
  width: 420px;
  line-height: 1.42;
`

const StyledLogo = styled(Logo)`
  height: 32px;
  margin-bottom: ${theme.spacing.sm};
`

/*
*********
COMPONENT
*********
*/

const LoginBox = props => {
  const { children, className } = props
  return (
    <Wrapper className={className}>
      <StyledLogo fill={theme.colours.steel} />
      {children}
    </Wrapper>
  )
}

export default LoginBox
