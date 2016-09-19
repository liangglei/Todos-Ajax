import React,{Component,PropTypes} from 'react';

export default class SearchTodo extends Component{
    render(){
        return (
            <div>
                <input type='text' ref='input'/>
                <button onClick={(e)=>this.handleClick(e)}>Search</button>
            </div>
        )

    }
    handleClick(e){
        const node=this.refs.input;
        const text=node.value.trim();
        this.props.onSearchClick(text);
        node.value='';
    }

}

SearchTodo.propTypes={
    onSearchClick:PropTypes.func.isRequired
}
