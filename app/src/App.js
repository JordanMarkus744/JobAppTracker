import "./App.css";
import React, { useState } from "react";
import Header from "./components/header/header";
import JobFormPopup from "./components/jobformpopup/jobformpopup";
import JobAppHolder from "./components/jobappholder/jobappholder";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now(), // Simple ID generation
    };
    setJobs([...jobs, jobWithId]);
  };

  return (
    <>
      <Header onOpenPopup={handleOpenPopup} />
      <JobAppHolder jobs={jobs} />
      <JobFormPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onAddJob={handleAddJob}
      />
    </>
  );
}

export default App;
