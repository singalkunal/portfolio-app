import { deleteById***REMOVED*** updateById } from "../utils/general";

const useFormTag = ({
    tags***REMOVED***
    tagValues***REMOVED*** // tag which have to be updated
    updateTags // calback function
***REMOVED*** => {
    const updateTag = async (newProps={***REMOVED*** => {
        var prevValues = tags ? tags : [];
        prevValues = [...prevValues] // clone

        console.log(prevValues);
        await updateById(null***REMOVED*** {...tagValues***REMOVED*** ...newProps}***REMOVED*** prevValues);
        console.log(prevValues);
        updateTags(prevValues);

        return true;
***REMOVED***;

    const deleteTag = async (event) => {
        if(!event.target.classList.contains('minus-icon')) return;
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.toggle('hide');
        const id = event.target.dataset.id;

        var prevValues = [...tags];
        console.log(prevValues);
        prevValues = await deleteById(id***REMOVED*** prevValues);
        console.log(prevValues);

        // timeout to pad time for animation
        setTimeout(() => {
            updateTags(prevValues);
    ***REMOVED******REMOVED*** 200);
***REMOVED***;

    return { updateTag***REMOVED*** deleteTag };
}

export default useFormTag
