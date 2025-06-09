import React from "react";
import PropTypes from "prop-types";
import "./jobapprow.css";

export default function JobAppRow({ job }) {
  return (
    <div className="job-row">
      <div className="job-info">
        <div className="job-company">{job.company}</div>
        <div className="job-position">{job.position}</div>
      </div>
      <div className="job-location">{job.location || "N/A"}</div>
      <div className="job-date">{job.date}</div>
      <div className="job-status">{job.status || "N/A"}</div>
      <div className="job-notes">{job.notes || "No notes"}</div>
    </div>
  );
}

JobAppRow.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    location: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
};
