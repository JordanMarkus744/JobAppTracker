import "./header.css";
import PropTypes from "prop-types";

export default function Header({ onOpenPopup }) {
  return (
    <div className="header">
      <h1 className="title">Job Application Tracker</h1>
      <button onClick={onOpenPopup}>Add Job Application</button>
    </div>
  );
}

Header.propTypes = {
  onOpenPopup: PropTypes.func.isRequired,
};
