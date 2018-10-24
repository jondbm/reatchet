import { connect } from 'react-redux'

import App from './App'
import * as uiActions from '../../reducers/ui/actions'
import * as userActions from '../../reducers/user/actions'

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  ...uiActions,
  setUser: userActions.setUser
})(App)
