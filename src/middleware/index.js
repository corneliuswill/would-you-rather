import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import logger from './logger'
//import http from './http'

export default applyMiddleware(
    thunk,
    logger,
    //http,
)

