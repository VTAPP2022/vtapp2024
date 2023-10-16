import React from "react";
import "../assets/Buttons.css";
import dicon from "../assets/download.svg";

function Buttons() {
  return (
    <div className="buttons">
      <a
        target="_blank"
        rel="noopener noreferrer"
        // href="https://docs.google.com/forms/d/e/1FAIpQLSdbqfoCMXHihwm-qlNLT-E-KgX1B0dhHRPZCcFz_cyszr60pQ/viewform?usp=send_form"
      >
        <button class="button button--mimas">
          <span>Register now</span>
        </button>
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        // href="https://drive.google.com/file/d/1K9wyye_jfm5368TjDQFII3WyOUYC0puz/view"
      >
        <button class="button button--mimas" href="">
          <span className="bflex">
            Brochure &nbsp; <img src={dicon} />
          </span>
        </button>
      </a>
    </div>
  );
}

export default Buttons;
