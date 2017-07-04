import React, { Component } from 'react';


class InputFisz extends Component {
    constructor(){
        super();
        this.state = {
            fisz: [
                '', ''
            ]
        }
        
        this.typeFisz = this.typeFisz.bind(this);
    }
    componentWillMount(){
        var data = this.state.fisz;
        data[2] = this.props.id;
        this.setState({
            fisz: data
        })
    }
    
    typeFisz(id, e){
        var data = this.state.fisz;
        data[id] = e.target.value;
        data[2] = this.props.id;
        this.props.data(data);
        this.setState({
            fisz: data
        })
    }
    render(){
        return (
            <div className="addNew-inputs-wrap">
               <input value={this.state.fisz[0]} onChange={(e) => this.typeFisz(0, e)} required="required" className="addNew-fisz-input f-addNew-input-txt"/>
               <input value={this.state.fisz[1]} onChange={(e) => this.typeFisz(1, e)} required="required" className="addNew-fisz-input f-addNew-input-txt"/>
                <div onClick={() => {this.props.remove(this.state.fisz[2])}} className="addNew-removeSingleInput-btn"></div>
            </div>
        )
    }
}
export default InputFisz