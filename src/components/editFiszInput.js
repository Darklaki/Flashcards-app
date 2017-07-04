import React, { Component } from 'react';
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//Components
//actions
import {editFisz} from '../actions/fishActions'
import {removeSingleFisz} from '../actions/fishActions'


@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class EditFiszInput extends Component {
    constructor(props){
        super(props);
        
        this.typeInput = this.typeInput.bind(this);
        this.togEditMode = this.togEditMode.bind(this);
        this.editFisz = this.editFisz.bind(this);
        this.removeSingleFisz = this.removeSingleFisz.bind(this);
        this.stopPropagationFoo = this.stopPropagationFoo.bind(this);
        this.togEditModeIftrue = this.togEditModeIftrue.bind(this);
        
        this.state = {
            a: this.props.fiszData[0],
            b: this.props.fiszData[1],
            editMode:false,
        }
    }

    componentDidMount(){
        document.addEventListener('click', this.togEditModeIftrue, false);
        this.editFiszInputWrapper.addEventListener('click', this.stopPropagationFoo, false);
        
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.togEditModeIftrue, false);
        this.editFiszInputWrapper.removeEventListener('click', this.stopPropagationFoo, false);
    }
    stopPropagationFoo(event){
        event.stopPropagation();
        if(event.target.className == 'editFisz-edit-btn edit-fisz-btns editFisz-editFisz-btn-hover' || event.target.className == 'editFisz-cancel-btn editFisz-fisz-btns'){
            this.togEditMode();
        } 
        if(event.target.className == 'editFisz-remove-btn edit-fisz-btns editFisz-removeSingleFisz-btn-hover'){
            this.removeSingleFisz()
        }
    }
    togEditModeIftrue(){
        if (this.state.editMode === true) {
            this.setState({
                editMode: !this.state.editMode
            })
        }
    }
    typeInput(what, e){
        var data = e.target.value;
        if(what === 'a'){
            this.setState({
                a: data
            })
        }else if(what === 'b'){
            this.setState({
                b: data
            })
        }
    }
    togEditMode(){
        this.setState({
            editMode: !this.state.editMode,
            a: this.props.fiszData[0],
            b: this.props.fiszData[1],
        })
    }
    
    editFisz(e){
        e.preventDefault();
        var arr = []
        arr[0] = this.state.a;
        arr[1] = this.state.b;
        var uniqId = this.props.uniqId;
        var fiszID = this.props.fiszID;
        if( arr[0].length > 0 && arr[1].length > 0 ){
            this.props.dispatch(editFisz(arr, uniqId, fiszID));
            this.setState({
                editMode: !this.state.editMode,
            })
        }
        
    }
    
    removeSingleFisz(){
        var uniqId = this.props.uniqId;
        var fiszID = this.props.fiszID;
        this.props.dispatch(removeSingleFisz(uniqId, fiszID));
        this.props.resizeOnRemove();
    }
  render() {
      const {fiszData, fiszID, uniqId} = this.props;
    return (
        
      <div className="editFiszInput-wrap" ref={elem => this.editFiszInputWrapper = elem}>
        {
            this.state.editMode ?
                <div className="editFiszInput-editRow" >
                    <a class='f-edit-fisz-nbmr'>{fiszID + 1}. </a>
                    <form className="editFiszInput-editRow" onSubmit={(e) => this.editFisz(e)}>
                        <ReactCSSTransitionGroup  transitionName="a-edit-editFisz" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            <input value={this.state.a} onChange={(e) => this.typeInput('a', e)}  class='editFisz-fisz-input f-edit-fisz'/>
                        </ReactCSSTransitionGroup>
                        <a class='f-edit-fisz editFisz-fisz-dash'>-</a>
                        <ReactCSSTransitionGroup  transitionName="a-edit-editFisz" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            <input value={this.state.b} onChange={(e) => this.typeInput('b', e)} class='editFisz-fisz-input f-edit-fisz'/>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup  transitionName="a-edit-icons" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            <div class='edit-editFisz-btns-row'>
                                <input type="submit" value="" class='editFisz-accept-btn editFisz-fisz-accept-btn editFisz-fisz-btns' /> 
                                <div onClick={() => this.togEditMode()} class='editFisz-cancel-btn editFisz-fisz-btns'></div>
                            </div>
                        </ReactCSSTransitionGroup>
                    </form>
                </div>
             :
                <div className="editFiszInput-showRow">
                    <a class='f-edit-fisz-nbmr'>{fiszID + 1}. </a>
                    <a class='f-edit-fisz'>{fiszData[0]} </a>
                    <a class='f-edit-fisz editFisz-fisz-dash'>-</a>
                    <a class='f-edit-fisz'>{fiszData[1]} </a>
                    <div onClick={() => this.togEditMode()} class='editFisz-edit-btn edit-fisz-btns editFisz-editFisz-btn-hover'></div>
                    <div onClick={() => this.removeSingleFisz()} 
                                         class='editFisz-remove-btn edit-fisz-btns editFisz-removeSingleFisz-btn-hover'></div>
                </div>
        
        }
            
            
      </div>

    );
  }
}

export default EditFiszInput;
