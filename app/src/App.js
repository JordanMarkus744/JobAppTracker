import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header/header";
import JobFormPopup from "./components/jobformpopup/jobformpopup";
import JobAppHolder from "./components/jobappholder/jobappholder";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://7rokwmw9f4.execute-api.us-east-2.amazonaws.com/prod/get-jobs"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Parse the JSON string inside data.body
        const parsedBody = JSON.parse(data.body);

        console.log("Fetched raw data:", data);
        console.log("Parsed body:", parsedBody);

        const fetchedJobs = (parsedBody.jobs || []).map((job) => ({
          userId: job.userId,
          jobId: job.jobId,
          company: job.company,
          date: job.date,
          location: job.location,
          description: job.notes,
          position: job.position,
          resumeUrl: job.resumeUrl,
          status: job.status,
        }));

        setJobs(fetchedJobs);
        console.log("Fetched jobs:", fetchedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

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
