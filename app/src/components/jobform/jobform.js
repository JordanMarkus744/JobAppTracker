import React, { useState } from "react";
import "./jobform.css";

/*
    company, position, location, date, status, notes
*/

export default function JobForm({ onAddJob }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAddJob({
      company,
      position,
      location,
      date,
      status,
      resume,
      description,
    });

    const formData = new FormData();
    formData.append("company", company);
    formData.append("position", position);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("status", status);
    formData.append("resume", resume);
    formData.append("notes", description);

    await fetch(
      "https://7rokwmw9f4.execute-api.us-east-2.amazonaws.com/prod/submit-job",
      {
        method: "POST",
        body: formData,
      }
    );

    console.log("Job submitted:", {
      company,
      position,
      location,
      date,
      status,
      resume,
      description,
    });

    setCompany("");
    setPosition("");
    setLocation("");
    setDate("");
    setStatus("");
    setDescription("");
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setResume(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <label htmlFor="resume">Resume:</label>
      <input
        type="file"
        id="resume"
        name="resume"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Job</button>
    </form>
  );
}
