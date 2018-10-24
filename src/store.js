import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './rootSaga'

let middlewares = []

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

let middleware = applyMiddleware(...middlewares)

if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

const store = createStore(reducers, middleware)
sagaMiddleware.run(sagas)

export { store }
