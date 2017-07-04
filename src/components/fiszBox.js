import React, { Component } from 'react';


class FiszBox extends Component {
    constructor(){
        super();
        this.editBox = this.editBox.bind(this);
        this.removeBox = this.removeBox.bind(this);
        this.playFisz = this.playFisz.bind(this);
        
        this.state={
            style:{
                'opacity': 0,
                'width': '0px',
                'overflow': 'hidden',
                'whiteSpace' : 'nowrap'
            }
        }
    }
    componentWillMount(){
        setTimeout(() => {
            this.setState({
                style : {
                    'opacity' : 1,
                    'width' : '310px',
                    'overflow': 'hidden',
                    'whiteSpace' : 'nowrap'
                }
            })
        }, 5)
    }
    editBox(){
        this.props.editBox(this.props.fiszka);
    }
    removeBox(){
        this.props.removeBox(this.props.fiszka.id, this.props.fiszka.name);
    }
    playFisz(data){
        this.props.playFisz(data);
    }
    
  render() {
      const {fiszka} = this.props;
      var cat = fiszka.category;
      if(cat === '') {
          cat = 'Bez kategorii'
      }
    return (
      <div className="fisz-box" style={this.state.style}>
        <div class='fiszBox-txtWrapper'>
            <a class='f-fiszBox-title'>{fiszka.name}</a>
            <div class='fiszBox-info-col'>
                <a class='f-fiszBox-infoHdr'>Category: </a>
                <a class='f-fiszBox-infoInfo'>{cat}</a>
            </div>
            <div class='fiszBox-info-col'>
                <a class='f-fiszBox-infoHdr'>Languages: </a>
                <a class='f-fiszBox-infoInfo'>{fiszka.languages[0]} - {fiszka.languages[1]}</a>
            </div>
        </div>
        <div class='fiszbox-bottomBar'>
            <div class='fiszBox-bottomBar-brick bckgColor-red' onClick={this.removeBox}>
                <img class='fiszBox-bottomBar-icon' src='img/garbage.png' />
            </div>
            <div class='fiszBox-bottomBar-brick bckgColor-blue' onClick={this.editBox}>
                <img class='fiszBox-bottomBar-icon' src='img/edit.png' />
            </div>
            <div class='fiszBox-bottomBar-brick bckgColor-green' onClick={() => this.playFisz(fiszka)}>
                <img class='fiszBox-bottomBar-icon' src='img/play-button.png' />
            </div>
        </div>
      </div>
    );
  }
}
/*
<a onClick={() => this.playFisz(fiszka)}>Play</a>
        <a onClick={this.editBox}><b>edytuj</b></a>
        <a onClick={this.removeBox}><b>Usuń fiszki</b></a>
*/
export default FiszBox;
