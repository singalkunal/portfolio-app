import "../css/SectionHeading.css";

const SectionHeading = ({ heading }) => {
    return (
        <div className="heading-container">
            <span className="text">{heading} </span>
        </div>
    )
}

export default SectionHeading
