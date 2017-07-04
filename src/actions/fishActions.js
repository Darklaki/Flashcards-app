var shortid = require('shortid');

export function doNothin(){
    return {
        type:'DO_NOTHIN'
    }
}
export function sendFiszki(data){
    return {
        type:'SEND_FISZKI',
        fiszki: data,
        id: shortid.generate()
    }
}

export function editFiszName(data, id){
    return {
        type:'EDIT_FISZ_NAME',
        newName: data,
        uniqID: id,
    }
}

export function editFisz(data, id, arrId){
    return {
        type:'EDIT_FISZ',
        ab: data,
        id: id,
        arrId: arrId
    }
}

export function editFiszCategory(id, data){
    return {
        type:'EDIT_FISZ_CATEGORY',
        uniqID: id,
        newCat: data
    }
}

export function editFiszLanguages(id, data){
    return {
        type:'EDIT_FISZ_LANGUAGES',
        uniqID: id,
        newLangs: data
    }
}

export function editFiszReverse(id){
    return {
        type:'EDIT_FISZ_REVERSE',
        uniqID: id,
    }
}

export function removeFiszBox(id){
    return {
        type:'REMOVE_FISZ_BOX',
        id : id
    }
}

export function removeSingleFisz(uniqID, arrID){
    return {
        type:'REMOVE_SINGLE_FISZ',
        uniqID : uniqID,
        arrID : arrID
    }
}

export function addSingleFisz(data, uniqID){
    return {
        type:'ADD_SINGLE_FISZ',
        newFisz: data,
        uniqID : uniqID,
    }
}