import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

// this and the above imports (and passing the store down) are essentially everything you need 
// to install redux-thunk into the app
const store = createStore(reducers, applyMiddleware(thunk))

// this is essentially boiler plate for any redux app
ReactDOMClient.createRoot(document.querySelector('#root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
) 
