import { connect } from 'react-redux'

import Dashboard from './Dashboard'
import { actions } from '../../reducers/dashboard'

const mapStateToProps = state => {
  return {
    user: state.user,
    ...state.dashboard
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
