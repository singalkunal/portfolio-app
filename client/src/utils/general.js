import ObjectId from 'bson-objectid';

export const deleteById = async (id***REMOVED*** arr=[]) => {
    console.log(id***REMOVED*** arr);
    arr = arr.filter(obj => (obj._id !== id && obj.id !== id));
    console.log(arr);

    return arr;
};

const updateObjById = (id***REMOVED*** updObj***REMOVED*** obj) => {
    obj[id] = updObj;
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
