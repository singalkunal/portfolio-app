import { deleteById, updateById } from "../utils/general";

const useFormTag = ({
    tags,
    tagValues, // tag which have to be updated
    updateTags // calback function
}) => {
    const updateTag = async (newProps={}) => {
        var prevValues = tags ? tags : [];
        prevValues = [...prevValues] // clone

        
        await updateById(null, {...tagValues, ...newProps}, prevValues);
        
        updateTags(prevValues);

        return true;
    };

    const deleteTag = async (event) => {
        if(!event.target.classList.contains('minus-icon')) return;
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.toggle('hide');
        const id = event.target.dataset.id;

        var prevValues = [...tags];
        
        prevValues = await deleteById(id, prevValues);
        

        // timeout to pad time for animation
        setTimeout(() => {
            updateTags(prevValues);
        }, 200);
    };

    return { updateTag, deleteTag };
}

export default useFormTag
