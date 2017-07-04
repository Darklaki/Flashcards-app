import React, { Component } from 'react';
import {connect} from 'react-redux'
var shortid = require('shortid');
//components
import SingleFiszInput from './singleFiszInput'
//actions
import {addSingleFisz} from '../actions/fishActions'

@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class SingleFiszInputContainer extends Component {
    constructor(){
        super();
        this.addFisz = this.addFisz.bind(this);
        this.getData = this.getData.bind(this);
        this.passInputFocusFoo = this.passInputFocusFoo.bind(this);
        
        this.state = {
            data: ['','','']
        }

    }

    passInputFocusFoo(e){
        this.setState({
            inputFocusFoo: e
        })
    }
    
    addFisz(e,uniqID){
        e.preventDefault();
        var data = this.state.data
        data[2] = shortid.generate();
        if (data[0].length < 1 || data[1].length < 1){
            console.log('One of inputs is empty...');
        }else{
            this.props.dispatch(addSingleFisz(data, uniqID))
            this.props.resizeOnAdd();
            this.setState({
                data: ['','','']
            })
            this.state.inputFocusFoo();
        }
    }
    getData(data){
        this.setState({
            data: data
        })
    }
  render() {
      const {uniqID, index} = this.props;
    return (
      <div >
        <form onSubmit={(e) => this.addFisz(e, uniqID)} class='editFisz-addnew-fisz-wrapper'>
            <a class='f-edit-fisz-nbmr'>{index}. </a>
            <SingleFiszInput ab={this.getData} inputFocus={this.passInputFocusFoo}/>
            <input type="submit" class='editFisz-addFisz-btn editFisz-addFisz-btn-fx' value=''/>
        </form>
      </div>
    );
  }
}

export default SingleFiszInputContainer;