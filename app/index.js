import React from 'react'
import { render } from 'react-dom'
import { createStore,applyMiddleware ,compose} from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers/reducers'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware=createLogger()
//initstate
let initstate={
    visibilityFilter:'',
    todos:{
            todos:[],
            requesting:false,
            requestingText:'',
            failture:false,
            failtureText:''
         }
};
fetch(`http://127.0.0.1:8081/get_json`)
              .then(response=>response.json())
               .then(json=>{
                   initstate.visibilityFilter=json.visibilityFilter;
                   initstate.todos.todos=json.todos;
                   console.log(json);
                   let store = createStore(todoApp,initstate,compose(
                    applyMiddleware(thunkMiddleware,loggerMiddleware),
                    window.devToolsExtension ? window.devToolsExtension() : f => f
                    ))

                    let rootElement = document.getElementById('root')
                    render( <Provider store = { store }>
                        <App />
                        </Provider>,
                        rootElement
                    )

               }).catch(error=>{
                   console.log('request failed',error)
                   return 
               })



