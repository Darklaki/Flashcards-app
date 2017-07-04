import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux'
//actions
import {editFiszLanguages} from '../actions/fishActions'

@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class EditFiszLangs extends Component {
    constructor(props){
        super(props);
        
        this.togEditMode = this.togEditMode.bind(this);
        this.updateLang = this.updateLang.bind(this);
        this.sendNewLangs = this.sendNewLangs.bind(this);
        this.reverse = this.reverse.bind(this);
        
        
        
        this.state={
            editing: false,
            langsArr: ['','']
        }
    }
    componentWillMount(){
        this.props.reverseInputs(this.reverse);
    }
    togEditMode(){
        if (this.state.editing === false){
            this.setState({
                langsArr: [this.props.langs[0], this.props.langs[1]]
            })
        }
        this.setState({
            editing: !this.state.editing
        })
    }
    
    updateLang(e, id){
        var txt = e.target.value;
        var langs = this.state.langsArr;
        langs[id] = txt;
        this.setState({
            langsArr: langs
        })
    }
    
    reverse(){
        if(this.state.editing === true){
            var a = this.state.langsArr[0];
            var b = this.state.langsArr[1];
            var inputVals = this.state.langsArr;
            inputVals[0] = b;
            inputVals[1] = a;
            this.setState({
                langsArr: inputVals
            })
        }else{
            this.setState({
                langsArr: [this.props.langs[0], this.props.langs[1]]
            })
        }
    }
    
    sendNewLangs(e){
        e.preventDefault();
        var langs = this.state.langsArr;
        langs[0] = langs[0].toLowerCase();
        langs[0] = langs[0].charAt(0).toUpperCase() + langs[0].slice(1);
        langs[1] = langs[1].toLowerCase();
        langs[1] = langs[1].charAt(0).toUpperCase() + langs[1].slice(1);
        if(langs[0].length > 0 && langs[1].length > 0){
            this.props.dispatch(editFiszLanguages(this.props.uniqID, langs))
            this.setState({
                editing: !this.state.editing
            })
        }else{
            this.setState({
                editing: !this.state.editing
            })
        }
    }
    
  render() {
      const {uniqID, langs} = this.props;
    return (
      <div className="editFisz-editLangs-cont">
            <a class='f-edit-smll-hdr'>Languages</a>
            {this.state.editing ?
                <form onSubmit={(e) => this.sendNewLangs(e)} className="editFisz-editLangs-row">
                    <ReactCSSTransitionGroup  transitionName="a-edit-langs" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <input value={this.state.langsArr[0]} onChange={(e) => {this.updateLang(e, 0)}} class='editFisz-langs-input f-edit-info'/>
                    </ReactCSSTransitionGroup>
                    <a class='f-edit-info edit-langs-dash'>-</a>
                    <ReactCSSTransitionGroup  transitionName="a-edit-langs" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <input value={this.state.langsArr[1]} onChange={(e) => {this.updateLang(e, 1)}} class='editFisz-langs-input f-edit-info'/>
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup  transitionName="a-edit-icons" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <div class='editFisz-lagns-btns-row'>
                            <input type="submit" class='editFisz-accept-btn editFisz-langs-btns editFisz-accept-langs' value=''/>
                            <div onClick={() => {this.togEditMode()}} class='editFisz-cancel-btn editFisz-langs-btns'></div>
                        </div>
                    </ReactCSSTransitionGroup>
                </form>
            :
                <div className="editFisz-editLangs-row">
                    <a className='f-edit-info'>{langs[0]}</a>
                    <a class='f-edit-info edit-langs-dash'>-</a>
                    <a className='f-edit-info'>{langs[1]}</a>
                    <div class='editFisz-edit-btn editFisz-edit-btn-info editFisz-editFisz-btn-hover' onClick={() => {this.togEditMode()}}></div>
                </div>
            }
            
      </div>
    );
  }
}

export default EditFiszLangs;
