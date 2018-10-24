import { all } from 'redux-saga/effects'
import 'regenerator-runtime/runtime'
import dashboard from './reducers/dashboard/sagas'
import projects from './reducers/projects/sagas'
import user from './reducers/user/sagas'

export default function* root() {
  yield all([...dashboard, ...projects, ...user])
}
