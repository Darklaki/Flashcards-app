import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//Components
import EditFiszInput from './editFiszInput'
import EditFiszCategory from './editFiszCategory'
import EditFiszLangs from './editFiszLangs'
import EditFiszReverse from './editFiszReverse'
import EditFiszName from './editFiszName'
import SingleFiszInputContainer from './singleFiszInputContainer'


class EditFisz extends Component {
    constructor(){
        super();
        this.togWin = this.togWin.bind(this);
        this.escapeWin = this.escapeWin.bind(this);
        this.newCategory = this.newCategory.bind(this);
        this.reverseLangs = this.reverseLangs.bind(this);
        
        this.resizeOnAdd = this.resizeOnAdd.bind(this);
        this.resizeOnRemove = this.resizeOnRemove.bind(this);
        
        this.state = {
            reverseLangsInputsFoo: '',
            reverseFiszInputs: 0,
            wrapperHeight : {
                'height' : '100%'
            },
            boxStyle_bckg:{
                'opacity' : 0
            },
            boxStyle_cont:{
                'opacity' : 0,
                'transform' : 'translateY(-80px)'
            }
        }
    }
    
    componentDidMount(){
        document.addEventListener('keydown', this.escapeWin, false)
        setTimeout(() => {
            this.setState({
                boxStyle_bckg:{
                'opacity' : 1
                },
                boxStyle_cont:{
                    'opacity' : 1,
                    'transform' : 'translateY(0px)'
                }
            });
            //calculate wrapper height
            var docH = document.getElementById('document').clientHeight;
            // +100px because of top: 100px;
            var boxH = document.getElementById('editFisz-cont').clientHeight + 100;
            if(boxH > docH){
                this.setState({
                    wrapperHeight: {
                        'height' : boxH + 37 + 'px'
                    }
                })
            }
        }, 10)
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.escapeWin, false)
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
            this.props.togWin();
        }, 300)
    }
    escapeWin(e){
        if ( e.keyCode == 27 ) {
            this.togWin();
        }
    }
    //pass category to change
    newCategory(data){
        this.props.newCategory(data);
    }
    
    //callback function reverse languages inputs while editing 
    reverseLangs(foo){
        this.setState({
            reverseLangsInputsFoo: foo
        })
    }
    
    //calculate wrapper height
    resizeOnAdd(){
        setTimeout(() => {
            var wrapH = document.getElementById('editFisz-wrapp').clientHeight;
            var docH = document.getElementById('document').clientHeight;
            // +100px because of top: 100px;
            var boxH = document.getElementById('editFisz-cont').clientHeight + 100;
            if( (boxH + 37) > docH){
                this.setState({
                    wrapperHeight: {
                        'height' : wrapH + 37 + 'px'
                    }    
                })    
            }    
        }, 300)
    }
    resizeOnRemove(){
        var wrapH = document.getElementById('editFisz-wrapp').clientHeight;
        var docH = document.getElementById('document').clientHeight;
        // +100px because of top: 100px;
        var boxH = document.getElementById('editFisz-cont').clientHeight + 100;
        if( (boxH - 37) > docH){
            setTimeout(() => {
                this.setState({
                    wrapperHeight: {
                            'height' : wrapH - 37 + 'px'
                        }    
                })    
            }, 300)
        }else{
            setTimeout(() => {
                this.setState({
                    wrapperHeight: {
                        'height' : docH + 'px'
                    }    
                })    
            }, 300)
        }
    }

  render() {
      const {data} = this.props
      var array = [];
      data.fiszki.map((fiszka) => {
        var fiszId = data.fiszki.indexOf(fiszka);
        array.push(
            <EditFiszInput key={fiszka[2]} uniqId={data.id} fiszData={fiszka} fiszID= {fiszId} resizeOnRemove={this.resizeOnRemove}/>
            )
        })
      var nextInputIndex = data.fiszki.length + 1;
    return (
      <div className="editFisz-wrap" id='editFisz-wrapp' style={this.state.wrapperHeight}>
        <div style={this.state.boxStyle_bckg} className="editFisz-bckg" onClick={() => this.togWin()}></div>
        <div className="editFisz-cont" style={this.state.boxStyle_cont} id='editFisz-cont'>
                <EditFiszName name={data.name} uniqID={data.id}/>
                <div class='editFisz-splitline'></div>
                <div className='editFisz-langsAndCategory-wrapper'>
                    <EditFiszCategory uniqID={data.id} category={data.category} newCategory={this.newCategory}/>
                    <EditFiszLangs reverseInputs={this.reverseLangs} uniqID={data.id} langs={data.languages}/>  
                    <EditFiszReverse uniqID={data.id} reverseLangsInputs={this.state.reverseLangsInputsFoo} />
                </div>
                <div class='editFisz-fiszki-wrapper'>
                    <ReactCSSTransitionGroup  transitionName="a-edit-fiszCont" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        {array}  
                    </ReactCSSTransitionGroup>
                    <SingleFiszInputContainer uniqID={data.id} index={nextInputIndex} resizeOnAdd={this.resizeOnAdd}/>
                </div>
                
                
        </div>
      </div>
    );
  }
}

export default EditFisz;
