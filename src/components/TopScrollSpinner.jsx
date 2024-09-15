import React from "react";
import "./TopScrollSpinner.css";

export const TopScrollSpinner = () => {
  return (
    <div className="top-scroll-spinner-container">
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default TopScrollSpinner;
