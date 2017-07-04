import React, { Component } from 'react';
import {connect} from 'react-redux'
//actions
import {removeFiszBox} from '../actions/fishActions'

@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class RemoveFiszBoxPopUp extends Component {
    constructor(){
        super();
        
        this.removeFisz = this.removeFisz.bind(this);
        this.cancel = this.cancel.bind(this);
        this.escapeWin = this.escapeWin.bind(this);
        this.state = {
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
    }
    
    removeFisz(data){
        this.props.dispatch(removeFiszBox(data.id));
        
        if(data.flag === true){
            this.props.setCat();
        }
        if(data.langFlag === true){
            this.props.setLang();
        }
        this.props.togWin();
    }
    cancel(){
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
            this.props.togWin();
        }, 300);
    }
    escapeWin(e){
        if ( e.keyCode == 27 ) {
            this.cancel();
        }
    }
    render(){
        const {data} = this.props
        return (
            <div class='removePopUp-wrapper'>
                <div style={this.state.boxStyle_bckg} class='removePopUp-background' onClick={() => this.cancel()}></div>
                <div class='removePopUp-content' style={this.state.boxStyle_cont}>
                    <a class='removePopUp-name f-removePopUp-name'>Remove <b>{data.name}</b>?</a>
                    <div class='removePopUp-buttons-row'>
                        <div class='removePopUp-button btn-red' onClick={() => this.removeFisz(data)}>
                            <a  class='f-removePopUp-btn'>Yes</a>
                        </div>
                        <div class='removePopUp-button btn-green' onClick={() => this.cancel()}>
                            <a class='f-removePopUp-btn'>No</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default RemoveFiszBoxPopUp