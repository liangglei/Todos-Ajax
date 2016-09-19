import React,{Component,PropTypes} from 'react';

export default class UpdateTodo extends Component{
    render(){
        return(
            <div style={{display:'block',marginBottom:'10px'}}>
                原来的值：
                <input type="text" ref='inputBefore'/>
                改后的值：
                <input type="text" ref='inputAfter'/>
                <button onClick={(e)=>this.handelClick(e)}>Update</button>
            </div>

        )
    }

    handelClick(e){
        const beforeNode=this.refs.inputBefore;
        const afterNode=this.refs.inputAfter;
        const beforeText=beforeNode.value.trim();
        const afterText=afterNode.value.trim();
        this.props.onUpdateClick(beforeText,afterText);
        beforeNode.value='';
        afterNode.value='';
    }
}

UpdateTodo.prototypes={
    onUpdateClick:PropTypes.func.isRequired
}