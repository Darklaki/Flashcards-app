import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var shortid = require('shortid');
//components
import InputFisz from './inputFisz'

var globalId = 0;
var inputs = [];
class NewFish extends Component {
    constructor(){
        super();
        this.updateFisz = this.updateFisz.bind(this);
        this.toggleWin = this.toggleWin.bind(this);
        this.escapeWin = this.escapeWin.bind(this);
        this.addInput = this.addInput.bind(this);
        this.removeInput = this.removeInput.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.sendFisz = this.sendFisz.bind(this);
        
        this.state={
            firstTime:true,
            isMounted:false,
            category:'No category' ,
            wrapperHeight : {
                'height' : '100%'
            },
            fiszki : [
                
            ],
            languages:['',''],
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
            isMounted: true,
        })
    }
    
    componentDidMount(){
        this.setState({
            firstTime: false,
        })
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
        }, 5);
        document.addEventListener('keydown', this.escapeWin, false)
    }
    componentWillUnmount(){
        inputs = [];
        this.setState({
            isMounted: false,
        })
        document.removeEventListener('keydown',this.escapeWin, false)
    }
    
    
    updateFisz(data){
        if(this.state.isMounted){
            var state = this.state.fiszki;
            var id = data[2]
            state[id] = data;
            this.setState({
                fiszki: state
            })
        }
    }
    toggleWin(){
        if(this.state.isMounted){
            this.setState({
                boxStyle_bckg:{
                    'opacity' : 0
                },
                boxStyle_cont:{
                    'opacity' : 0,
                    'transform' : 'translateY(-80px)'
                }
            })
            setTimeout(() => {this.props.togWin()}, 200);
            /*this.props.togWin();*/
        }
    }
    escapeWin(e){
        if ( e.keyCode == 27 ) {
            this.toggleWin();
        }
    }//34
    addInput(){
        var id = globalId
        inputs[id] = <div className='addNew-input-container' key={id}>
                    <InputFisz  data={(e) => this.updateFisz(e)} id={id} remove={(id) => this.removeInput(id)}/>
                    </div>
        globalId++;
        //calculate new wrapper height
        setTimeout(() => {
             
        var wrapH = document.getElementById('wrapp').clientHeight;
        var docH = document.getElementById('document').clientHeight;
        // +100px because of top: 100px;
        var boxH = document.getElementById('addNew-box').clientHeight + 100;
        if( (boxH + 34) > docH){
            this.setState({
                wrapperHeight: {
                    'height' : wrapH + 34 + 'px'
                }    
            })    
        }    
        }, 200)
         
        this.forceUpdate();
       
    }
    removeInput(id){
        var update = this.state.fiszki;
        update[id] = undefined;
        this.setState({
            fiszki : update
        })
        inputs[id] = null;
        //calculate new wrapper height
        var wrapH = document.getElementById('wrapp').clientHeight;
        var docH = document.getElementById('document').clientHeight;
        // +100px because of top: 100px;
        var boxH = document.getElementById('addNew-box').clientHeight + 100;
        if( (boxH - 34) > docH){
            setTimeout(() => {
                this.setState({
                    wrapperHeight: {
                        'height' : wrapH - 34 + 'px'
                    }    
                })    
            }, 200)
            }else{
                setTimeout(() => {
                    this.setState({
                        wrapperHeight: {
                            'height' : docH + 'px'
                        }    
                    })    
                }, 200)
            }
        
    }
    updateName(e){
        var val = e.target.value;
        this.setState({
            name: val
        })
    }
    updateCategory(e){
        var val = e.target.value;
        this.setState({
            category: val
        })
    }
    updateLanguage(e, nmbr){
        var langs = this.state.languages;
        //make first letter uppercase
        var txt = e.target.value;
        txt = txt.toLowerCase();
        txt = txt.charAt(0).toUpperCase() + txt.slice(1);
        langs[nmbr] = txt;
        this.setState({
            languages: langs
        })
    }
    
    sendFisz(e){
        e.preventDefault();
        var fiszName = this.state.name;
        var fiszCat = this.state.category
        if(fiszCat === '' || fiszCat.toLowerCase() === 'all'){
            fiszCat = 'No category';
        }
        fiszCat = fiszCat.toLowerCase();
        fiszCat = fiszCat.charAt(0).toUpperCase() + fiszCat.slice(1);
        var fiszLangs = this.state.languages;
        fiszLangs[0] = fiszLangs[0].toLowerCase();
        fiszLangs[1] = fiszLangs[1].toLowerCase();
        fiszLangs[0] = fiszLangs[0].charAt(0).toUpperCase() + fiszLangs[0].slice(1);
        fiszLangs[1] = fiszLangs[1].charAt(0).toUpperCase() + fiszLangs[1].slice(1);
        var fiszArr = this.state.fiszki;
        if (typeof fiszName != 'undefined' && fiszName.length > 0) {
            if(fiszLangs[0] != fiszLangs[1]){
                var packedData = {};
                packedData.name = fiszName;
                packedData.category = fiszCat;
                packedData.languages = fiszLangs;
                packedData.fiszki = []  
                fiszArr.map((fisz) => {
                    if(typeof fisz != 'undefined' && fisz[0].length > 0 && fisz[1].length > 0){
                        fisz.splice(2,1);
                        fisz[2] = shortid.generate();
                        packedData.fiszki.push(fisz);
                    }
                })
                if( packedData.fiszki.length > 0 ){
                    this.props.fiszPack(packedData, fiszCat)
                    this.toggleWin();
                }
            }else{
                document.getElementById('first-lang-input').focus();
            }
            
        }
        
    }
    
    render(){
        //render categories prompt
        var catInputOptions = [];
        this.props.allCategories.map((cat) => {
            catInputOptions.push(
                <option value={cat} key={cat}/>
            )
        });
        //render first 3 inputs
        if(this.state.firstTime){
           for(var i = 0; i < 3; i++){
               var id = globalId
                inputs[id] = 
                    <div className='addNew-input-container' key={id}>
                    <InputFisz  data={(e) => this.updateFisz(e)} id={id} remove={(id) => this.removeInput(id)}/>
                    </div>
                globalId++;
            } 
        }
    
        //all inputs
        var allInputsNumber = 0;
        for(var i = 0; i<inputs.length; i++ ){
            var element = inputs[i];
            if( element != null ) {
                allInputsNumber++;
            }
        }
        
        //manage mini language headers 
        var langStyle = {
            'height' : '0px',
            'marginBottom' : '0px'
        }
        if(typeof this.state.languages[0] !== 'undefined' || typeof this.state.languages[1] !== 'undefined'){
            if(this.state.languages[0].length > 0 || this.state.languages[1].length > 0){
                langStyle = {
                    'height' : '17px',
                    'marginBottom' : '6px'
                }
            }else{
                langStyle = {
                    'height' : '0px',
                    'marginBottom' : '0px'
                }
            }
        }
        return (
            <div className="addNew-wrap" id='wrapp' style={this.state.wrapperHeight}>
                <div className="addNew-bckg" onClick={() => this.toggleWin()} style={this.state.boxStyle_bckg}>
                </div>
                <div className="addNew-cont" id='addNew-box' style={this.state.boxStyle_cont}>
                        <form className='addNew-form' onSubmit={(e) => this.sendFisz(e)}>
                            <div class='addNew-input-container'>
                                <a class='f-addNew-input-name-hdr'>Title</a>
                                <input value={this.state.name} onChange={this.updateName} required="required" className="addNew-name-input f-addNew-input-name"/>
                            </div>
                            
                            <div class='addNew-input-container'>
                                <a class='f-addNew-input-cat-hdr'>Category</a>
                                <input value={this.state.category} onChange={this.updateCategory} list="test" className="addNew-category-input f-addNew-input-cat"/>
                                <datalist id="test">
                                    {catInputOptions}
                                </datalist>
                            </div>
                            

                            <div className="addNew-languagesInput-cont">
                                <a class='f-addNew-input-lang-hdr'>Languages</a>
                                <div className="addNew-langsInput-wrapper">
                                    <input value={this.state.languages[0]} className="addNew-lang-input f-addNew-input-lang" id='first-lang-input' required="required" onChange={(e) => this.updateLanguage(e, 0)}/>
                                    <input value={this.state.languages[1]}  className="addNew-lang-input f-addNew-input-lang"  required="required" onChange={(e) => this.updateLanguage(e, 1)}/>
                                </div>
                            </div>
                            
                            <div class='addNew-addNewBTN-container'>
                                <div className="addNew-addFiszInput-btn" onClick={() => this.addInput()}>
                                    <a class='f-addNew-addNew-btn'>ADD NEW</a>    
                                </div>
                                <div class='addNew-amount-cont'>
                                    <a className='f-addNew-amount'>Amount: </a>
                                    <a className='f-addNew-amount-nmbr'>{allInputsNumber}</a>
                                </div>
                            </div>
                            
                            <div class='addNew-inputs-col'>
                                <div class='addNew-inputs-col-langs-wrapper'>
                                    <div class="addNew-inputs-col-langs-lang" style={langStyle}>
                                        <a class='f-addNew-lang'>{this.state.languages[0]}</a>
                                    </div>
                                    <div class="addNew-inputs-col-langs-lang" style={langStyle}>
                                        <a class='f-addNew-lang'>{this.state.languages[1]}</a>
                                    </div>
                                </div>
                                <ReactCSSTransitionGroup transitionName="a-AddNew-inputs" transitionEnterTimeout={350} transitionLeaveTimeout={250}>
                                    {inputs}     
                                </ReactCSSTransitionGroup>
                            </div>
                            

                            <input class='addNew-submit-collection f-addNew-addCollection-btn' type="submit" value="Add collection" />
                        </form>
                </div>
            </div>
        )
    }
}
export default NewFish