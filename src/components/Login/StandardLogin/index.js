import { connect } from 'react-redux'

import StandardLogin from './StandardLogin'
import * as actions from '../../../reducers/user/actions'

export const mapStateToProps = state => ({
  hasInvalidCredentials: state.user.hasInvalidCredentials
})

export default connect(mapStateToProps, { ...actions })(StandardLogin)
