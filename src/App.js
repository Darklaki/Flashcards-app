import React, { Component } from 'react';
import {connect} from 'react-redux'
//components
import NewFish from './components/newFisz'
import FiszkiContainer from './components/fiszkiContainer'
import EditFisz from './components/editFisz'
import PlayFisz from './components/playFisz'
import RemoveFiszBoxPopUp from './components/removeFiszPopUp'
//actions
import {sendFiszki} from './actions/fishActions'
import {removeFiszBox} from './actions/fishActions'



@connect((store) => {
    return{
        fiszki: store.fiszki
    }
})
class App extends Component {
    constructor(){
        super();

        this.togAddWindow = this.togAddWindow.bind(this);
        this.togEditWindow = this.togEditWindow.bind(this);
        this.togPlayWindow = this.togPlayWindow.bind(this);
        
        this.sendFiszki = this.sendFiszki.bind(this);
        
        this.removeFiszBoxPopUp = this.removeFiszBoxPopUp.bind(this);
        this.togRemovePopUp = this.togRemovePopUp.bind(this);
        this.setOriginalCategory = this.setOriginalCategory.bind(this);
        this.setOriginalLang = this.setOriginalLang.bind(this)
        
        this.selectCategory = this.selectCategory.bind(this);
        this.selectLang = this.selectLang.bind(this);
        
        this.setEditedCategory = this.setEditedCategory.bind(this);
        
        this.state = {
            addWindow : false,
            editWindow: false,
            playWindow: false,
            removePopUp: false,
            dataForPlayBox: [],
            dataForRemovePopUp: [],
            category: 'All',
            lang: '-'
        }
    }
    componentDidMount(){
        
    }
    sendFiszki(data, catToSet){
        this.props.dispatch(sendFiszki(data));
        this.setState({
            category: catToSet
        })
    }
    
    togAddWindow(){
        this.setState({
            addWindow: !this.state.addWindow
        })
    }
    
    togEditWindow(data){
        this.setState({
            editWindow: !this.state.editWindow,
            editWindowData: data
        })
    }
    togPlayWindow(data){
        this.setState({
            playWindow:!this.state.playWindow,
            dataForPlayBox: data
        })
    }
    
    /*Change category or language if you removed last one*/
    removeFiszBoxPopUp(id, name, flag, langFlag){
        var removeData = {
            id: id,
            name: name,
            flag: flag,
            langFlag: langFlag
        }
        this.setState({
            dataForRemovePopUp:removeData,
            removePopUp: !this.state.removePopUp
        })
    }
    setOriginalCategory(){
        this.setState({
                category: 'All'
        })
    }
    setOriginalLang(){
        this.setState({
                lang: '-'
        })
    }
    togRemovePopUp(){
        this.setState({
            removePopUp: !this.state.removePopUp
        })
    }
    /*END removing*/
    
    selectCategory(e){
        var cat = e.target.value
        this.setState({
            category: cat
        });
    }
    setEditedCategory(cat){
        this.setState({
            category: cat,
        })
    }
    selectLang(e){
        var lang = e.target.value
        this.setState({
            lang: lang
        });
    }
  render() {
      //categories select form
      var categories = [];
      this.props.fiszki.map((fiszka) => {
          if ( typeof fiszka === 'undefined' ){
          }else{
            var flag = true;
            for (var i = 0; i < categories.length; i++){
                if ( fiszka.category === categories[i] ) {
                    flag = false;
                }
            }
            if(flag === true){
                categories.push(fiszka.category);
            }
          }
      });  
      var options = [
        <option key={'All'} value={'All'} >All</option>,
                    ];
      if ( categories.length > 0 ){
        categories.map((cat) => {
            if(cat === 'All'){
            }else{
                options.push(
                    <option key={cat} value={cat} >{cat}</option>
                )
            }
        }); 
      }
      var selectedCat = this.state.category;

      //languages select form
      var languages = [];
      this.props.fiszki.map((fiszka) => {
          if(typeof fiszka === 'undefined'){}
          else{
            var flag1 = true;
            var flag2 = true;
            for (var i = 0; i < languages.length; i++){
                if(fiszka.languages[0] === languages[i]){
                    flag1 = false;
                }
                if(fiszka.languages[1] === languages[i]){
                    flag2 = false;
                }
            }
            if(flag1 === true){
                languages.push(fiszka.languages[0])
            }
            if(flag2 === true){
                languages.push(fiszka.languages[1])
            }
          }
      });
      var langOptions = [
          <option key={'-'} value={'-'} >-</option>
      ];
      if(languages.length > 0){
          languages.map((lang) => {
              if(lang === '-'){
                  
              }else{
                langOptions.push(
                    <option key={lang} className="f-app-topGrid-option" value={lang} >{lang}</option>
                )      
              }
              
          })
      }
    return (
      <div className="App">
        <div className="app-topGrid">
            <div onClick={() => this.togAddWindow()} class='addNew-button'>
                <a className="app-topGrid-addNewBtn">Add new</a>
            </div>
            <div className="app-topGrid-options-wrapper">
                <div className="app-topGrid-form">
                    <a className="f-app-topGrid-options-header">Category</a>
                    <form >
                        <select className="app-topGrid-form-cats f-app-topGrid-select" name='categories' value={this.state.category} onChange={this.selectCategory}>
                            {options}
                        </select>
                    </form>
                </div>
                <div className="app-topGrid-form">
                    <a className="f-app-topGrid-options-header">Language</a>
                    <form >
                        <select className="app-topGrid-form-cats f-app-topGrid-select"  name='languages' value={this.state.lang} onChange={this.selectLang}>
                            {langOptions}
                        </select>
                    </form>
                </div>    
            </div>
            
        </div>
        {
            this.state.addWindow ? <NewFish allCategories={categories} fiszPack={this.sendFiszki} togWin={this.togAddWindow} /> : null
        }
        <FiszkiContainer fiszkiStore={this.props.fiszki} fiszkiCategory={selectedCat} fiszkiLang={this.state.lang} editBox={this.togEditWindow} playFisz={this.togPlayWindow} removeBox={this.removeFiszBoxPopUp}/> 
        {
             this.state.editWindow ? <EditFisz togWin={this.togEditWindow} data={this.state.editWindowData} newCategory={this.setEditedCategory}/> : null   
        }
        {
            this.state.removePopUp ?
                <RemoveFiszBoxPopUp data={this.state.dataForRemovePopUp}
                setCat={this.setOriginalCategory}
                setLang={this.setOriginalLang}
                togWin={this.togRemovePopUp}
                />
            : null
        }
        {
            this.state.playWindow ?
                <PlayFisz togWinFoo={this.togPlayWindow} fiszka={this.state.dataForPlayBox}/>
            : null
        }
      </div>
    );
  }
}

export default App;
