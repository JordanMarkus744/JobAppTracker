import "./jobformpopup.css";
import JobForm from "../jobform/jobform";
import PropTypes from "prop-types";

export default function JobFormPopup({ isOpen, onClose, onAddJob }) {
  if (!isOpen) return null;

  const handleAddJob = (job) => {
    console.log("New job added:", job);
    onAddJob(job); // Call the onAddJob prop with the new job
    onClose(); // Close popup after adding job
  };

  return (
    <div className="job-form-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Add Job</h2>
        <JobForm onAddJob={handleAddJob} />
      </div>
    </div>
  );
}

JobFormPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddJob: PropTypes.func.isRequired,
};
