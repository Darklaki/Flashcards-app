import {createStore} from 'redux'

import {fiszRed} from './reducers/fiszRed'

import {retrieveState} from './localStorage'

const data = retrieveState();

export default createStore(fiszRed, data)