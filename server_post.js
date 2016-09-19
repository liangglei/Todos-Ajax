"use strict"

var webpack=require('webpack')
var webpackDevMiddleware=require('webpack-dev-middleware')
var webpackHotMiddleware=require('webpack-hot-middleware')
var webpackConfig=require('./webpack.express.config') 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

//编译
var compiler=webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler,{
	noInfo:true,
	//publicPath:webpackConfig.output.publicPath
   stats: {
        colors: true
    },
	lazy: false,
	 watchOptions: {
        aggregateTimeout: 300,
        poll: true
     },
	}))
app.use(webpackHotMiddleware(compiler))


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));

//news
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/dev/" + "index.html" );
})

app.get('/index_post.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index_post.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
       // 输出 JSON 格式
	   response = {
		   first_name:req.body.first_name,
		   last_name:req.body.last_name
	   };
        var des_file = __dirname + "/data.json";
		var jsonData=[];
		//异步先读取
		fs.readFile(des_file, function (err, data) {
			  if(err){ console.log(err);  res.end('error!');}
			  else{
 				   if(data.length>0){console.log("data:"+data.toString());jsonData=JSON.parse(data.toString());}
			       console.log("jsonData:"+JSON.stringify(jsonData));
				   jsonData.push(response);
			       
				  //写回
				 fs.writeFile(des_file, JSON.stringify(jsonData), function (err) {
					 if(err){
						  console.log( err );
						  res.end("error!");
					 }else{
						   res.end(JSON.stringify(jsonData));
						 }
				  });
			  }
		  });
});

//获取数据
//http://127.0.0.1:8081/get_json?filter=aa 带查询条件
//http://127.0.0.1:8081/get_json  所有数据
app.get('/get_json',function(req,res){
	  var des_file = __dirname + "/data.json";
	 
	/*初始化几条数据
  	var a={
			  visibilityFilter: 'SHOW_ALL',
			  todos: [
				{
				  text: 'Consider using Redux',
				  completed: true,
				},
				{
				  text: 'Keep all state in a single tree',
				  completed: false
				}
			  ]
            };
	  fs.writeFile(des_file, JSON.stringify(a),  function(err) {
		   if (err) {
			   return console.error(err);
		   }else{
			   console.log(a);
		   }
        });
		*/
		
	  fs.readFile( des_file, function (err, data) {
      if(err){console.log(err);res.end('N'); }
	  else{
		   var temp=JSON.parse(data.toString());
           if(req.query.filter){
			   console.log(temp);
			   let filter=req.query.filter;
			   var tempTodos=[];
			   temp.todos.forEach(function(item) {
				   if(item.text.indexOf(filter)!==-1){
					   tempTodos.push(item);
				   }
			   });
			   temp.todos=tempTodos;
		   }
           res.end(JSON.stringify(temp));
	  }
   });

});
//删除数据
//url:http://127.0.0.1:8081/del_json?filter=gaving
app.get('/del_json',function(req,res){
	var des_file = __dirname + "/data.json";
	var data=fs.readFileSync(des_file);
	var jsonData=JSON.parse(data.toString());
	var tmp=[];
	var filter=req.query.filter;
	jsonData.todos.forEach(function(item){
		if(item.text.indexOf(filter)==-1)
		{
		   tmp.push(item);
		}
	});
	jsonData.todos=tmp;
	fs.writeFile(des_file,JSON.stringify(jsonData),function(err){
        if(err){console.log(err);res.end('N'); }
        res.end(JSON.stringify(jsonData));
	});
	
});

//修改数据
//url:http://127.0.0.1:8081/update_json?before=gavingliang&after=gaving
app.get('/update_json',function(req,res){
	var des_file = __dirname + "/data.json";
	var data=fs.readFileSync(des_file);
	var jsonData=JSON.parse(data.toString());
	var tmp=[];
	var before=req.query.before;
	var after=req.query.after;
	jsonData.todos.forEach(function(item){
		if(item.text.indexOf(before)!=-1)
		{
			item.text=after;
		}
		tmp.push(item);
	});
	jsonData.todos=tmp;
	fs.writeFile(des_file,JSON.stringify(jsonData),function(err){
        if(err){console.log(err);res.end('N'); }
        res.end(JSON.stringify(jsonData));
	});
});


//修改完成状态
//url:http://127.0.0.1:8081/update_json?index=0
app.get('/update_com_json',function(req,res){
	var des_file = __dirname + "/data.json";
	var data=fs.readFileSync(des_file);
	var jsonData=JSON.parse(data.toString());
	var tmp=[];
	var qindex=req.query.index;
	jsonData.todos.forEach(function(item,index){
        if(qindex==index){
            console.log(qindex+":"+index)

			item.completed=!item.completed;
		}
		tmp.push(item);
	});
	jsonData.todos=tmp;
	fs.writeFile(des_file,JSON.stringify(jsonData),function(err){
        if(err){console.log(err);res.end('N'); }
        res.end(JSON.stringify(jsonData));
	});
});

//增加数据
//url:http://127.0.0.1:8081/add_json?text=gavingliang&completed=false
app.get('/add_json',function(req,res){
	var des_file = __dirname + "/data.json";
	var data=fs.readFileSync(des_file);
	var jsonData=JSON.parse(data.toString());
	var tmp= {
      text: req.query.text,
      completed:req.query.completed==="true"?true:false,
     };
	jsonData.todos.push(tmp);
	fs.writeFile(des_file,JSON.stringify(jsonData),function(err){
           if(err){console.log(err);res.end('N'); }
           res.end(JSON.stringify(jsonData));
	});
	
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})