import ObjectId from 'bson-objectid';

const deleteObjectById = async (id***REMOVED*** obj) => {
    console.log('delete'***REMOVED*** id***REMOVED*** obj);
    if(obj[id]) {
        delete obj[id];
        console.log('ues');
***REMOVED***
    return obj;
}
export const deleteById = async (id***REMOVED*** arr=[]) => {
    console.log(id***REMOVED*** arr);
    if(!(arr instanceof Array)) {
        return deleteObjectById(id***REMOVED*** arr);
***REMOVED***

    arr = arr.filter(obj => (obj._id !== id && obj.id !== id));
    console.log(arr);

    return arr;
};

const updateObjById = (id***REMOVED*** updObj***REMOVED*** obj) => {
    obj[id] = {
        ...updObj***REMOVED***
        _id: id
***REMOVED***;
}

// will push as new entry if not exists
export const updateById = (id=null***REMOVED*** updObj***REMOVED*** arr=[]) => {
    if(!id) {
        id = ObjectId().toHexString();
***REMOVED***

    if(!(arr instanceof Array)) {
        return updateObjById(id***REMOVED*** updObj***REMOVED*** arr);
***REMOVED***

    const idx = arr.findIndex(obj => (obj._id === id || obj.id === id));
    if(idx === -1) {
        arr.push({
            ...updObj***REMOVED***
            _id: id
***REMOVED***
***REMOVED***
    else arr[idx] = updObj;
}
