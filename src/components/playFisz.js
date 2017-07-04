import React, { Component } from 'react';


class PlayFisz extends Component {
    constructor(){
        super();
        
        this.togWin = this.togWin.bind(this);
        this.escapeWin = this.escapeWin.bind(this);
        
        this.play = this.play.bind(this);
        this.tryAgain = this.tryAgain.bind(this);
        this.randFisz = this.randFisz.bind(this);
        
        this.showFisz = this.showFisz.bind(this);
        
        this.knewIt = this.knewIt.bind(this);
        this.didntKnowIt = this.didntKnowIt.bind(this);
        
        this.state = {
            fiszToGo : [],
            fiszDone: [],
            actualFisz : [],
            congrats : ['Congratulations!', 'Great!', 'Getting better!', 'Good job!'],
            fiszShowed: false,
            isPlaying: false,
            firstTime: true,
            isGameFinished: false,
            good: 0,
            wrong: 0,
            boxStyle_bckg:{
                'opacity' : 0
            },
            boxStyle_cont:{
                'opacity' : 0,
                'transform' : 'translateY(-80px)'
            }
        }
    }
    componentWillMount(){
        this.setState({
            fiszToGo: this.props.fiszka.fiszki
        })
        document.addEventListener('keydown', this.escapeWin, false)
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                boxStyle_bckg:{
                'opacity' : 1
                },
                boxStyle_cont:{
                    'opacity' : 1,
                    'transform' : 'translateY(0px)'
                }
            })
        }, 5)
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.escapeWin, false)
        this.setState({
            fiszToGo : [],
            fiszDone: [],
            actualFisz : [],
            fiszShowed: false,
            isPlaying: false,
            good: 0,
            wrong: 0
        })
    }
    togWin(){
        this.setState({
            boxStyle_bckg:{
                'opacity' : 0
            },
            boxStyle_cont:{
                'opacity' : 0,
                'transform' : 'translateY(-80px)'
            }
        })
        setTimeout(() => {
            this.props.togWinFoo();
        }, 300);
    }
    escapeWin(e){
        if ( e.keyCode == 27 ) {
            this.togWin();
        }
    }
    randFisz(){
        var fiszkiArr = this.state.fiszToGo;
        var fiszArrLength = fiszkiArr.length;
        var randID = Math.floor(Math.random() * fiszArrLength);
        this.setState({
            actualFisz: fiszkiArr[randID]
        })
    }
    
    play(){
        this.randFisz();
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }
    showFisz(){
        this.setState({
            fiszShowed: !this.state.fiszShowed
        })
    }
    knewIt(){
        var actual = this.state.actualFisz;
        var fiszToGo = this.state.fiszToGo;
        var fiszDone = this.state.fiszDone;
        fiszToGo = fiszToGo.filter((fisz) => {
            if(fisz[0] != actual[0] && fisz[1] != actual[1]){
                return fisz
            }{
                return
            }
        })
        fiszDone.push(actual);
        this.setState({
            good: this.state.good + 1,
            actualFisz: [],
            fiszToGo: fiszToGo,
            fiszDone: fiszDone,
            fiszShowed: false,
            firstTime: false
        })
        //rand from variables, i cant get new state ofc
        var fiszArrLength = fiszToGo.length;
        if(fiszArrLength > 0){ //check if there are some flashcards left
            var randID = Math.floor(Math.random() * fiszArrLength);
            this.setState({
                actualFisz: fiszToGo[randID]
            })    
        }else{
            this.setState({
                isGameFinished: true
            })
        }
    }
    didntKnowIt(){
        this.setState({
            wrong: this.state.wrong + 1,
            actualFisz: [],
            fiszShowed: false,
            firstTime: false
        })
        this.randFisz();
    }
    tryAgain(){
        this.setState({
            fiszToGo : this.props.fiszka.fiszki,
            fiszDone: [],
            actualFisz : [],
            fiszShowed: false,
            isPlaying: false,
            firstTime: true,
            isGameFinished: false,
            good: 0,
            wrong: 0,
        })
    }
  render() {
    const {togWinFoo, fiszka} = this.props;
    const {congrats} = this.state;
    var amount = this.props.fiszka.fiszki.length;
      
      //good and wrong bars length 
      var allAnswers = this.state.good + this.state.wrong;
      var goodBar = (this.state.good / allAnswers) * 100 ;
      var wrongBar = (this.state.wrong / allAnswers) * 100 ;
      if( allAnswers > 0 ){
          var goodFont = {
            'color': '#fff'
          }
          var wrongFont = {
                  'color': '#fff'
              }
          if(goodBar < 11){
              goodFont = {
                'color': '#333'
              }
          }
          if(wrongBar < 11){
              wrongFont = {
                'color': '#333'
              }
          }    
      }
      var goodStyle = {
          'width' : goodBar + '%' 
      }
      var wrongStyle = {
          'width' : wrongBar + '%' 
      }
      
    return (
      <div className="playFisz-wrapper">
        <div style={this.state.boxStyle_bckg} className="playFisz-bkcg" onClick={() => {this.togWin()}}></div>
        <div className='playFIsz-container' style={this.state.boxStyle_cont}>
                
            {this.state.isPlaying ?
             this.state.isGameFinished ?
             <div class='playFisz-finished-container'>
                <div class='playFisz-finished-nameCont'>
                    <a class='f-playFisz-title'>{this.props.fiszka.name}</a>
                </div>
                <div class='playFisz-finished-congrats'>
                    <a class='f-playFisz-congrats'>{congrats[Math.floor(Math.random()*congrats.length)]}</a>
                </div>
                <div class='playFisz-finished-stats-wrapper'>
                    <a class='f-playFisz-stat'>GOOD</a>
                    <div class='playFisz-finished-stats'>
                        <div class='playFisz-finished-stat-bar-cont' style={goodStyle}>
                            <div class='playFisz-finished-stat-bar count-bar-green'></div>
                            <div class='playFisz-finish-stats-nmbr'>
                                <a class='f-playFisz-over-stat-nmbr'>{this.state.good}</a>
                            </div>
                        </div>
                        <div class='playFisz-finished-stat-bar-cont' style={wrongStyle}>
                            <div class='playFisz-finished-stat-bar count-bar-red'></div>
                            <div class='playFisz-finish-stats-nmbr stats-nmbr-right'>
                                <a class='f-playFisz-over-stat-nmbr'>{this.state.wrong}</a>
                            </div>
                        </div>
                    </div>
                    <a class='f-playFisz-stat'>WRONG</a>
                </div>
                <div class='playFisz-againBtn'>
                    <div class='playFisz-btn playFisz-blue-btn'  onClick={() => this.tryAgain()}>
                        <a class='f-playFisz-btn'>Try again</a>    
                    </div>
                </div>
             </div>
             :
                <div>
                    <div class='playFisz-top-wrapper'>
                        <div class='playFisz-top-name'>
                            <a class='f-playFisz-title'>{this.props.fiszka.name}</a>
                        </div>
                        <div class='playFisz-top-stats'>
                            <div class='playFisz-top-stats-bar-wrapper first-stat-bar'>
                                <a class='f-playFisz-stat'>GOOD</a>
                                <div class='playFisz-top-stats-count-bar-wrapper'>
                                    <div class='playFisz-top-stats-count-bar count-bar-green' style={goodStyle}></div>
                                    <div class='playFisz-top-stats-count-bar-nmbr'>
                                        <a class='f-playFisz-stat-nmbr' style={goodFont}>{this.state.good}</a>    
                                    </div>
                                    
                                </div>
                            </div>
                            <div class='playFisz-top-stats-bar-wrapper'>
                                <a class='f-playFisz-stat'>WRONG</a>
                                <div class='playFisz-top-stats-count-bar-wrapper'>
                                    <div class='playFisz-top-stats-count-bar count-bar-red' style={wrongStyle}></div>
                                    <div class='playFisz-top-stats-count-bar-nmbr'>
                                        <a class='f-playFisz-stat-nmbr' style={wrongFont}>{this.state.wrong}</a>    
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='playFisz-words-container'>
                        <div class='playFisz-word-firstWord'>
                            <a class='f-playFisz-fisz'>{this.state.actualFisz[0]}</a>
                        </div>
                        
                        {this.state.fiszShowed ?
                        <div>
                            <div class='playFisz-secondWord'>
                                <a class='f-playFisz-fisz'>{this.state.actualFisz[1]}</a>
                            </div>
                            <div class='playFisz-check-btns-wrapper'>
                                <div class='playFisz-btn btn-color-green playFisz-checkBtn' onClick={() => this.knewIt()}>
                                    <a class='f-playFisz-btn'>Knew it</a>
                                </div>
                                <div class='playFisz-btn btn-color-red playFisz-checkBtn' onClick={() => this.didntKnowIt()}>
                                    <a class='f-playFisz-btn'>{"Didn't know it"}</a>
                                </div>
                            </div>
                        </div>
                         :
                        <div class='playFisz-showBtn-wrapper'>
                            <div class='playFisz-btn btn-color-green' onClick={() => this.showFisz()}><a class='f-playFisz-btn'>Show me</a></div>
                        </div>
                         
                        }
                    </div>
             </div>
             
             :
             <div className='playFisz-start'>
                <a class='f-playFisz-letsStart'>Lets start with <b class='f-playFisz-letsStart-bold'>{fiszka.name}</b></a>
                <div class='playFisz-start-amount-wrapper'>
                    <div class='playFisz-start-amount-line'></div>
                    <div class='playFisz-start-amount-txt-wrap'>
                        <a class='f-playFisz-letsStart-amount'>Amount: </a>
                        <a class='f-playFisz-letsStart-amount-nmbr'> {amount}</a>
                    </div>
                    <div class='playFisz-start-amount-line'></div>
                </div>
                <div onClick={() => this.play()} class='playFisz-btn btn-color-green'>
                    <a class='f-playFisz-btn'>Start</a>
                </div>
             </div>
            }
        </div>
       
      </div>
    );
  }
}

export default PlayFisz;
