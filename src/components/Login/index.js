import { connect } from 'react-redux'

import Login from './Login'

export const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, {})(Login)
