import React, { Component } from 'react';


class SingleFiszInput extends Component {
    constructor(){
        super();
        
        this.inputType = this.inputType.bind(this);
        this.focusOnFirst = this.focusOnFirst.bind(this);
        
        this.state={
            ab: ['','']
        }
    }
    componentWillMount(){
        this.props.inputFocus(this.focusOnFirst);
    }
    
    focusOnFirst(){
        this.setState({
            ab: ['','']
        })
        document.getElementById("editFisz-addNew-firstInput").focus();
    }
    
    inputType(e, type){
        var txt = e.target.value;
        var data = this.state.ab;
        data[type] = txt;
        this.setState({
            ab: data
        });
        this.props.ab(data)
    }
  render() {
    return (
      <div class='editFisz-addNew-inputs-wrapper'>
        <input value={this.state.ab[0]} id='editFisz-addNew-firstInput' onChange={(e) => this.inputType(e, 0)} class='editFisz-addnew-input f-edit-fisz'/> 
        <div class='editFisz-addNew-input-blankSpace'></div>
        <input value={this.state.ab[1]} onChange={(e) => this.inputType(e, 1)} class='editFisz-addnew-input f-edit-fisz'/>    
      </div>
    );
  }
}

export default SingleFiszInput;