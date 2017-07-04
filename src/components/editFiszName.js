import React, { Component } from 'react';
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//actions
import {editFiszName} from '../actions/fishActions'

@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class EditFiszName extends Component {
    constructor(){
        super();
        
        this.updateName = this.updateName.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.sendNewName = this.sendNewName.bind(this);
        
        this.state={
            editing: false,
            name:''
        }
    }
    componentWillMount(){
        this.setState({
            name: this.props.name
        })
    }
    toggleEditing(){
        this.setState({
            editing: !this.state.editing
        })
    }
    updateName(e){
        var txt = e.target.value;
        this.setState({
            name: txt
        })
    }
    sendNewName(e){
        e.preventDefault();
        if(this.state.name.length > 0){
            this.props.dispatch(editFiszName(this.state.name, this.props.uniqID));
            this.toggleEditing();
        }else{
            this.toggleEditing();
        }
    }
    
  render() {
      const {name, uniqID} = this.props;

    return (
      <div className="editFiszInput-name-wrapper">
        <a class='f-edit-title-hdr'>Title</a>
       {this.state.editing ?
        <div className='editFiszInput-name-form-wrapper'>
            <form onSubmit={(e) => this.sendNewName(e)} class='editFiszInput-name-form'>
                <ReactCSSTransitionGroup  transitionName="a-edit-title" transitionAppear={true}
                transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <input value={this.state.name} onChange={(e) => this.updateName(e)} class='f-edit-title-input editFisz-title-input'/>
                </ReactCSSTransitionGroup>
                <input type="submit" class='editFisz-accept-btn edit-accept-title' value=''/>
                <div onClick={() => this.toggleEditing()} class='editFisz-cancel-btn edit-cancel-title'></div>
            </form>
        </div>
        :
        <div className='editFiszInput-nameHeader-wrapper'>
            <div class='editFisz-title-col'>
                <a class='f-edit-title-input'>{name}</a> 
            </div>
            <div class='editFisz-edit-btn title-edit-btn editFisz-editFisz-btn-hover' onClick={() => this.toggleEditing()} ></div>
        </div>
        
        }
      </div>
    );
  }
}

export default EditFiszName;
