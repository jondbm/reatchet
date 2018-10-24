import styled from 'styled-components'

import Recaptcha from '../common/Recaptcha'
import theme from '../../theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Lato, sans-serif;
  max-width: 100%;
`

export const Title = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colours.steel};
  margin-bottom: ${theme.spacing.sm};
  max-width: 100%;
`
export const Subtitle = styled.span`
  font-size: 16px;
  text-align: center;
  color: ${theme.colours.greyDark};
  margin-bottom: ${theme.spacing.sm};
  max-width: 100%;
`

export const StyledRecaptcha = styled(Recaptcha)`
  margin-top: ${theme.spacing.xs};
`
