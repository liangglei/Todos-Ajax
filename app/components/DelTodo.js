import React,{Component,PropTypes} from 'react';
import './DelTodo.css';

export default class DelTodo extends Component{
   render(){
       return(
           <div className="delTodo-margin-style ">
             <input type="text" ref='input'/>
             <button onClick={(e)=>this.handleClick(e)}>Del</button>
           </div>
       );  
    }
   handleClick(e){
       const node=this.refs.input;
       const text=node.value.trim();
       alert("you are del all contain "+text+"todos");
       this.props.onDelClick(text);
       node.value='';
   }

}

DelTodo.prototypes={
    onDelClick:PropTypes.func.isRequired
}