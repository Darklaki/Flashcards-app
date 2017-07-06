import fiszState from '../state/fishState.js'



export function fiszRed(state=fiszState, action){
    switch(action.type){
        case 'SEND_FISZKI':{
            var data = action.fiszki;
            data.id = action.id;
            state = {...state,
                    fiszki: [...state.fiszki, data
                     ]
                    }
            return state
        }
        case 'EDIT_FISZ_NAME':{
            state = {...state,
                    fiszki: state.fiszki.map((fiszObj) => {
                        if(fiszObj.id === action.uniqID){
                            fiszObj.name = action.newName
                        }
                     return fiszObj
                    })
                    }
            return state
        }
        case 'EDIT_FISZ':{
            var a = action.ab[0]
            var b = action.ab[1]
            state = {...state,
                     fiszki: state.fiszki.map((fiszObj) => {
                     if(fiszObj.id === action.id){
                         fiszObj.fiszki.map((fiszArr, id) => {
                            if(id === action.arrId){
                                fiszArr = [...fiszArr,
                                    fiszArr[0] = a,
                                    fiszArr[1] = b,
                                ]
                                return fiszArr
                            }else{
                                return fiszArr
                            }
                         })
                         return fiszObj
                     }else{
                         return fiszObj
                     }
                    
                    })
                    }
            return state
        }
        case 'EDIT_FISZ_CATEGORY':{
            state = {...state,
                    fiszki: state.fiszki.map((fisz) => {
                     if(fisz.id === action.uniqID){
                        fisz.category = action.newCat
                     }
                     return fisz
                    })}
            return state
        }
        case 'EDIT_FISZ_LANGUAGES':{
            state={...state,
                  fiszki: state.fiszki.map((fisz) => {
                     if(fisz.id === action.uniqID){
                        var langs0 = action.newLangs[0];
                        var langs1 = action.newLangs[1];
                        fisz.languages = fisz.languages.map((el, id) => {
                            return action.newLangs[id]
                        });
                     }
                     return fisz
                  })
                }
                    
            return state
        }
        case 'EDIT_FISZ_REVERSE':{
            state = {...state,
                    fiszki: state.fiszki.map((fiszObj) => {
                     if(fiszObj.id === action.uniqID){
                        fiszObj.fiszki = fiszObj.fiszki.map((fisz,id) => {
                            var left = fisz[0];
                            var right = fisz[1];
                            return [right, left, fisz[2]]
                        })
                        var left = fiszObj.languages[0];
                        var right = fiszObj.languages[1];
                        languages : [...fiszObj.languages, fiszObj.languages[0]=right,
                                    fiszObj.languages[1]=left]
                        }
                    return fiszObj                    
                    })
                    }
            return state
        }
        case 'REMOVE_FISZ_BOX':{
            state = {...state,
                    fiszki: 
                        state.fiszki.filter((e) => {
                            return e.id != action.id
                        })           
                     
                    }
            return state

        }
        case 'REMOVE_SINGLE_FISZ' : {
            state = {...state,
                     fiszki: state.fiszki.map((fiszObj) => {
                     if(fiszObj.id === action.uniqID){
                         fiszObj.fiszki = fiszObj.fiszki.filter((e) => {
                            return fiszObj.fiszki.indexOf(e) != action.arrID
                         })
                         return fiszObj
                     }else{
                         return fiszObj
                     }
                    
                    })
                    }
            return state
        }
        case 'ADD_SINGLE_FISZ' : {
            state = {...state,
                     fiszki: state.fiszki.map((fiszObj) => {
                     if(fiszObj.id === action.uniqID){
                         fiszObj.fiszki =  [...fiszObj.fiszki, [action.newFisz[0], action.newFisz[1], action.newFisz[2]]];
                     }else{
                         
                     }
                    return fiszObj
                    } )
                   }
            return state
        }
        default:{
            return state
        }
    }
}

