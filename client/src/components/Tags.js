import '../css/Tags.css';

const Tags = ({ tags ***REMOVED*** => {
    return (
        <div className="tags">
***REMOVED***
                (tags || []).map(tag => {
                    return <div className="tag" key={tag._id} >{tag.tag}</div>
***REMOVED***)
***REMOVED***
        </div>
    )
}

export default Tags
