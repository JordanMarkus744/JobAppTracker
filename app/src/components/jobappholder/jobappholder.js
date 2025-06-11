import React from "react";
import PropTypes from "prop-types";
import JobAppRow from "../jobapprow/jobapprow";
import "./jobappholder.css";

export default function JobAppHolder({ jobs }) {
  console.log("JobAppHolder jobs:", jobs);
  if (jobs.length === 0) {
    return (
      <div className="job-holder">
        <div className="no-jobs">
          <p>
            No job applications yet. Click "Add Job Application" to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-holder">
      <div className="job-header">
        <div className="header-company">Company & Position</div>
        <div className="header-location">Location</div>
        <div className="header-date">Date Applied</div>
        <div className="header-status">Status</div>
        <div className="header-notes">Description</div>
      </div>
      <div className="job-list">
        {jobs.map((job, index) => (
          <JobAppRow key={job.id || index} job={job} />
        ))}
      </div>
    </div>
  );
}

JobAppHolder.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      company: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      location: PropTypes.string,
      date: PropTypes.string,
      status: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};
