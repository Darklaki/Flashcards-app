import React, { Component } from 'react';
import {connect} from 'react-redux'
//actions
import {editFiszReverse} from '../actions/fishActions'

@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class EditFiszReverse extends Component {
    constructor(){
        super();
        this.reverse = this.reverse.bind(this);
        
    }
    reverse(){
        this.props.dispatch(editFiszReverse(this.props.uniqID));
    }
    
  render() {
      const {uniqID, reverseLangsInputs} = this.props;

    return (
      <div className="editFiszInput-reverse-wrapper">
       <a class='f-edit-smll-hdr'>Reverse</a>
        <div onClick={() => {this.reverse();
                          reverseLangsInputs()}} class='editFisz-reverse-btn'></div>
      </div>
    );
  }
}

export default EditFiszReverse;
