import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//Components
import FiszBox from './fiszBox'

class FiszkiContainer extends Component {
    constructor(props){
        super(props);
        this.editBox = this.editBox.bind(this);
        this.removeBox = this.removeBox.bind(this);
        this.playBox = this.playBox.bind(this);
    }
    editBox(data){
        this.props.editBox(data)
    }
    playBox(data){
        this.props.playFisz(data);
    }
    removeBox(id, name){
        var count = 0;
        var langCount = 0;
        this.props.fiszkiStore.map((fisz) => {
            if ( fisz.category === this.props.fiszkiCategory ){
                count++;
            }
            if(fisz.languages[0] === this.props.fiszkiLang){
                langCount++;
            }
            if(fisz.languages[1] === this.props.fiszkiLang){
                langCount++;
            }
        })
        var catFlag = false;
        var langFlag = false;
        if(count > 1){
        }else{
            catFlag = true;
        }
        
        if(langCount > 1){
        }else{
            langFlag = true;
        }
        this.props.removeBox(id, name, catFlag, langFlag);
    }
    
  render() {
      const {fiszkiStore} = this.props;
      var fiszkiArr = [];
      fiszkiStore.map((fiszka) => {
            if (typeof fiszka === 'undefined') {
            }
            else {
                if (this.props.fiszkiCategory === 'All') {
                    if(this.props.fiszkiLang === '-'){
                       fiszkiArr.push( 
                        < FiszBox fiszka = {fiszka} key = {fiszka.id} editBox = {this.editBox} removeBox = {this.removeBox} playFisz={this.playBox}/>
                        )     
                    }
                    if(this.props.fiszkiLang === fiszka.languages[0] || this.props.fiszkiLang === fiszka.languages[1]) {
                        fiszkiArr.push( 
                        < FiszBox fiszka = {fiszka} key = {fiszka.id} editBox = {this.editBox} removeBox = {this.removeBox} playFisz={this.playBox}/>
                        )
                    }
                }
                    else {
                        if (this.props.fiszkiCategory === fiszka.category) {
                            if(this.props.fiszkiLang === '-'){
                                fiszkiArr.push( 
                                < FiszBox fiszka = {fiszka} key = {fiszka.id} editBox= {this.editBox} removeBox = {this.removeBox} playFisz={this.playBox}/>
                                          ) 
                            }
                            if(this.props.fiszkiLang === fiszka.languages[0] || this.props.fiszkiLang === fiszka.languages[1]){
                                fiszkiArr.push( 
                                < FiszBox fiszka = {fiszka} key = {fiszka.id} editBox= {this.editBox} removeBox = {this.removeBox} playFisz={this.playBox}/>
                                          )
                            }
                            }
                        }
                    }
                });
      var zeroFlag = true;
      if(fiszkiArr.length > 0){
          zeroFlag = false;
      }
    return (
        <div>
         <div className="container"> 
            {
                zeroFlag ? 
                <div class='emptyContainer'>
                    <a class='f-no-flashcards'>No flashcards</a>
                    <img class='noFlashcards-image' src='../public/img/noFlashcards.png'/>
                </div>
                : null
            }
            <ReactCSSTransitionGroup transitionName="a-Fiszbox" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {fiszkiArr}
            </ReactCSSTransitionGroup>
         </div>
        
        </div>
    );
  }
}

export default FiszkiContainer;
