import ObjectId from 'bson-objectid';

const deleteObjectById = async (id, obj) => {
    
    if(obj[id]) {
        delete obj[id];
        
    }
    return obj;
}
export const deleteById = async (id, arr=[]) => {
    
    if(!(arr instanceof Array)) {
        return deleteObjectById(id, arr);
    }

    arr = arr.filter(obj => (obj._id !== id && obj.id !== id));
    

    return arr;
};

const updateObjById = (id, updObj, obj) => {
    obj[id] = {
        ...updObj,
        _id: id
    };
}

// will push as new entry if not exists
export const updateById = (id=null, updObj, arr=[]) => {
    if(!id) {
        id = ObjectId().toHexString();
    }

    if(!(arr instanceof Array)) {
        return updateObjById(id, updObj, arr);
    }

    const idx = arr.findIndex(obj => (obj._id === id || obj.id === id));
    if(idx === -1) {
        arr.push({
            ...updObj,
            _id: id
        });
    }
    else arr[idx] = updObj;
}
