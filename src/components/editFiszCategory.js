import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux'
//actions
import {editFiszCategory} from '../actions/fishActions'

@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class EditFiszCategory extends Component {
    constructor(){
        super();
        
        this.togEditMode = this.togEditMode.bind(this);
        this.updateCatState = this.updateCatState.bind(this);
        this.sendNewCat = this.sendNewCat.bind(this);
        
        this.state = {
            editing: false,
            category: ''
        }
    }
    componentWillMount(){
        this.setState({
            category: this.props.category
        })
    }
    
    togEditMode(){
        if(this.state.editing === true){
            this.setState({
                category: this.props.category
            })
        }
        this.setState({
            editing: !this.state.editing
        })
    }
    updateCatState(e){
        var txt = e.target.value;
        this.setState({
            category: txt
        })
    }
    
    sendNewCat(e){
        e.preventDefault();
        var newCat = this.state.category;
        newCat = newCat.toLowerCase();
        newCat = newCat.charAt(0).toUpperCase() + newCat.slice(1);
        if(newCat == this.props.category || newCat.length < 1){
            this.togEditMode();
        }else{
            this.props.dispatch(editFiszCategory(this.props.uniqID, newCat));
            this.props.newCategory(newCat)
            this.setState({
                editing: !this.state.editing
            })
        }
    }
    
  render() {
    const {uniqID, category} = this.props;
    return (
      <div className="editFisz-fiszCategory">
        <a className="f-edit-smll-hdr">Category</a>
        { this.state.editing ? 
            <form onSubmit={(e) => {this.sendNewCat(e)}} className="editFisz-fiszCategory-row">
                <ReactCSSTransitionGroup  transitionName="a-edit-category" transitionAppear={true}
                transitionAppearTimeout={250} transitionLeave={true} transitionLeaveTimeout={250} transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                    <input value={this.state.category} onChange={(e) => {this.updateCatState(e)}} class='editFisz-category-input f-edit-info'/>
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup  transitionName="a-edit-icons" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <div class='editFisz-category-buttons-row'>
                        <input type="submit" class='editFisz-accept-btn editFisz-accept-cat editFisz-cat-btns' value=''/>
                        <div onClick={() => this.togEditMode()} class='editFisz-cancel-btn editFisz-cat-btns'></div>
                    </div>
                    
                </ReactCSSTransitionGroup>
            </form>
        :
            <div className="editFisz-fiszCategory-row">
                <a class='f-edit-info'>{category}</a>
                <div class='editFisz-edit-btn editFisz-edit-btn-cat editFisz-editFisz-btn-hover' onClick={() => this.togEditMode()}></div>
            </div>
        }
        
        
      </div>
    );
  }
}

export default EditFiszCategory;
