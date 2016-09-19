import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,DEL_TODO,UPDATE_TODO,SEARCH_TODO,FAILTURE,REQUEST } from '../actions/actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state ={
    todos:[],
    requesting:false,
    requestingText:'',
    failture:false,
    failtureText:''
    }, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({},state,{
                todos:[
                    ...state.todos, {
                        text: action.text,
                        completed: false
                       }
                   ], 
              requesting:false,
              failture:false
               }) 
        case COMPLETE_TODO:
            return Object.assign({},state,{todos:[
                ...state.todos.slice(0, action.index),
                Object.assign({}, state.todos[action.index], {
                    completed: true
                }),
                ...state.todos.slice(action.index + 1)
            ]}) 
        case DEL_TODO:
             var stateSlice=state.todos.slice(0,state.todos.length);
             var retState=[];
             stateSlice.forEach(function(item){
                 if(item.text.indexOf(action.text)==-1)
                 {retState.push(item);}
             });
             return Object.assign({},state,{todos:retState,  requesting:false,
              failture:false})
        case UPDATE_TODO:
             var stateSlice=state.todos.slice(0,state.todos.length);
             var retState=[];
             stateSlice.forEach(function(item){
                 if(item.text.indexOf(action.before)!==-1)
                 {item.text=action.after;}
                 retState.push(item);
             });
            return Object.assign({},state,{todos:retState,  requesting:false,
              failture:false})
        case SEARCH_TODO:
             if(action.text){
             var stateSlice=state.todos.slice(0,state.todos.length);
             var retState=[];
             stateSlice.forEach(function(item){
                 if(item.text.indexOf(action.text)!==-1)
                 {retState.push(item);}
             });
             return Object.assign({},state,{todos:retState,  requesting:false,
                     failture:false})
             }else{
                  return Object.assign({},state,{todos:action.todos,  requesting:false,
                     failture:false})
             }
             
         case FAILTURE:
          return Object.assign({},state,{
              failture:true,
              failtureText:action.text
          })
        case REQUEST:
          return Object.assign({},state,{
              requesting:true,
              requestingText:action.text
          })
        default:
            return state
    }
}
/*
function requestHandle(state={
    requesting:false,
    requestingText:'',
    failture:false,
    failtureText:''
},action){
    switch(action.type)
    {
        case FAILTURE:
          return Object.assign({},state,{
              failture:true,
              failtureText:action.text
          })
        case REQUEST:
          return Object.assign({},state,{
              requesting:true,
              requestingText:action.text
          })
          default:return state
    }
}  */

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp