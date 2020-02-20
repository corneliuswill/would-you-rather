import { createStore, compose } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

const configureStore = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        reducer, 
        composeEnhancers(middleware)
    )

    store.subscribe(() => {
        localStorage.state = JSON.stringify(store.getState())
    })

    return store
}

export default configureStore
