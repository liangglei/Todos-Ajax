import fetch from 'isomorphic-fetch'

/*
 * action 类型
 */


export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const ADD_TODO = 'ADD_TODO';
export const DEL_TODO='DEL_TODO';
export const UPDATE_TODO='UPDATE_TODO';
export const SEARCH_TODO='SEARCH_TODO';
export const INIT_TODOS='INIT_TODOS';

//异步请求action
export const SUCESS="SUCESS";
export const FAILTURE="FAILTURE";
export const REQUEST="REQUEST";


/*
 * 其它的常量
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

 function addTodo(text) {
    return { type: ADD_TODO, text }
}

 function completeTodo(index) {
    return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}

 function delTodo(text){
    return {type:DEL_TODO,text}
}

 function updateTodo(before,after){
    return {type:UPDATE_TODO,before,after}
}

 function searchTodo(todos,text){
    return {type:SEARCH_TODO,todos,text}
}

function initTodos(todos){
    return {type:INIT_TODOS,todos}
}

/**异步处理服务器端数据 */
 function failureAjax(text){
    return {type:FAILTURE,text}
}

 function requestAjax(text){
    return {type:REQUEST,text}
}
/**通用函数 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function addTodoAjax(text){
    return dispatch => {
           dispatch(requestAjax("正在处理"))
        return fetch(`http://127.0.0.1:8081/add_json?text=${text}&completed=false`)
               .then(checkStatus)
               .then(parseJSON)
               .then(json=>{
                   console.log(json);
                   if(json=="N"){return dispatch(failureAjax("增加失败"))}
                   return dispatch(addTodo(text))
               }).catch(error=>{
                   console.log('request failed',error)
                   return dispath(failureAjax("服务器错误"))
               })
    }
}

/**搜索现在只支持前端的搜索 */
export function searchTodoAjax(text){
    return dispatch=>{
        dispatch(requestAjax("正在处理"));
        if(text){
            fetch(`http://127.0.0.1:8081/get_json?filter=${text}`)
               .then(checkStatus)
               .then(parseJSON)
               .then(json=>{
                   console.log(json);
                   if(json=="N"){return dispatch(failureAjax("查询失败"))}
                   return dispatch(searchTodo(json.todos,text))
               }).catch(error=>{
                   console.log('request failed',error)
                   return dispacth(failureAjax("服务器错误"))
               }) 
        }else{
            fetch(`http://127.0.0.1:8081/get_json`)
               .then(checkStatus)
               .then(parseJSON)
               .then(json=>{
                   console.log(json);
                   if(json=="N"){return dispatch(failureAjax("获取数据失败"))}
                   return dispatch(searchTodo(json.todos,''))
               }).catch(error=>{
                   console.log('request failed',error)
                   return dispatch(failureAjax("服务器错误"))
               })
        }
    }

}

export function delTodoAjax(text){
        return dispatch => {
           dispatch(requestAjax("正在处理"))
        return fetch(`http://127.0.0.1:8081/del_json?filter=${text}`)
               .then(checkStatus)
               .then(parseJSON)
               .then(json=>{
                   console.log(json);
                   if(json=="N"){return dispatch(failureAjax("删除失败"))}
                   return dispatch(delTodo(text))
               }).catch(error=>{
                   console.log('request failed',error)
                   return dispath(failureAjax("服务器错误"))
               })
    }

}


 export function  updateTodoAjax(before,after){
      return dispatch => {
           dispatch(requestAjax("正在处理"))
        return fetch(`http://127.0.0.1:8081/update_json?before=${before}&after=${after}`)
               .then(checkStatus)
               .then(parseJSON)
               .then(json=>{
                   console.log(json);
                   if(json=="N"){return dispatch(failureAjax("更新失败"))}
                   return dispatch(updateTodo(before,after))
               }).catch(error=>{
                   console.log('request failed',error)
                   return dispath(failureAjax("服务器错误"))
               })
    }
 }


export function  completeTodoAjax(index){
          return dispatch => {
           dispatch(requestAjax("正在处理"))
        return fetch(`http://127.0.0.1:8081/update_com_json?index=${index}`)
               .then(checkStatus)
               .then(parseJSON)
               .then(json=>{
                   console.log(json);
                   if(json=="N"){return dispatch(failureAjax("更新失败"))}
                   return dispatch(completeTodo(index))
               }).catch(error=>{
                   console.log('request failed',error)
                   return dispath(failureAjax("服务器错误"))
               })
    }


}
