import React, { useState } from "react";
import "./jobform.css";

export default function JobForm({ onAddJob }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setCompany("");
    setPosition("");
    setLocation("");
    setDate("");
    setStatus("");
    setResume(null);
    setDescription("");
    setError("");
    setSuccess("");
    // Reset file input
    const fileInput = document.getElementById("resume");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!company || !position || !date || !status) {
        throw new Error("Please fill in all required fields");
      }

      if (!resume) {
        throw new Error("Please select a resume file");
      }

      // Create FormData
      const formData = new FormData();
      formData.append("userId", "root"); // If I deploy this app, I need to make this lookup the users id before sending it with the payload
      formData.append("company", company);
      formData.append("position", position);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("status", status);
      formData.append("resume", resume);
      formData.append("notes", description);

      console.log("Submitting job application...");
      console.log("File details:", {
        name: resume.name,
        size: resume.size,
        type: resume.type,
      });

      const response = await fetch(
        "https://7rokwmw9f4.execute-api.us-east-2.amazonaws.com/prod/submit-job",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);

        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage =
            errorJson.error || errorJson.message || `HTTP ${response.status}`;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Success response:", result);

      // Call the parent callback
      onAddJob({
        id: result.id,
        company,
        position,
        location,
        date,
        status,
        resume,
        description,
        resumeUrl: result.resumeUrl,
      });

      setSuccess("Job application submitted successfully!");
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Failed to submit job application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setResume(null);
      return;
    }

    console.log("File selected:", {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
    });

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      e.target.value = ""; // Clear the input
      setResume(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size must be less than 5MB.");
      e.target.value = ""; // Clear the input
      setResume(null);
      return;
    }

    setError(""); // Clear any previous error
    setResume(selectedFile);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {error && (
        <div
          className="error-message"
          style={{
            color: "red",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid red",
            borderRadius: "4px",
            backgroundColor: "#ffe6e6",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="success-message"
          style={{
            color: "green",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid green",
            borderRadius: "4px",
            backgroundColor: "#e6ffe6",
          }}
        >
          {success}
        </div>
      )}

      <input
        type="text"
        placeholder="Company *"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Position *"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        disabled={isSubmitting}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
        disabled={isSubmitting}
      >
        <option value="">Select Status *</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      <label htmlFor="resume">Resume (PDF, max 5MB) *:</label>
      <input
        type="file"
        id="resume"
        name="resume"
        accept="application/pdf"
        onChange={handleFileChange}
        required
        disabled={isSubmitting}
      />
      {resume && (
        <div style={{ fontSize: "0.9em", color: "#666", marginTop: "5px" }}>
          Selected: {resume.name} ({Math.round(resume.size / 1024)}KB)
        </div>
      )}

      <textarea
        placeholder="Job Description / Notes"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add Job"}
      </button>
    </form>
  );
}
