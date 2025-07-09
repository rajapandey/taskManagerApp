import React from "react";
import "./ThemeToggle.css";

const ThemeToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="btn btn-outline-secondary theme-toggle-btn"
    >
      <span className={`theme-icon ${dark ? "rotate" : ""}`}>
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeToggle;
