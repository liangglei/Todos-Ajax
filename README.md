# 说明

1. 这是一个基于redux+react+webpack+express构建的demo，主要扩展了redux的demo里的todos项目，为其增加了ajax请求部分，提供了增删改查等一些常用的功能。  

2. 后台接口由express模拟，通过node.js读写data.json文件来模拟数据库操作。  

3. 使用方法： a.npm install   
   	         b.npm run server  
             c.浏览器打开地址http://127.0.0.1:8081/index.html即可看到（界面简陋后期会用ui组件来美化）
#state 树结构
      {
      visibilityFilter: 'SHOW_ALL',
      todos:{
      todos: [
    		{
    		  text: 'Consider using Redux',
    		  completed: true,
    		},
    		{
    		  text: 'Keep all state in a single tree',
    		  completed: false
    		}
      ],
    	   requesting:false,
    	   requestingText:'',
    	   failture:false,
    	   failtureText:''
    }
    }
 
#redux+react+webpack+express完全脱离后端开发实践总结：
1. 先开发出一个视图界面
2. 设计对应的state对象树,尽量考虑到扩展性
3. 先不考虑ajax请求，设计仅前端需要的action
4. 实现action对应的的reducer处理方法
5. 用express写出action对应的模拟接口
6. 设计依赖ajax的action，替换掉前端使用的action
7. 当后台接口开发完成后，替换模拟接口，联调进行系统测试
