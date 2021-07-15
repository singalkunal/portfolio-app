import '../css/Tags.css';

const Tags = ({ tags }) => {
    return (
        <div className="tags">
            {
                (tags || []).map(tag => {
                    return <div className="tag" key={tag._id} >{tag.tag}</div>
                })
            }
        </div>
    )
}

export default Tags
