import "@vtapp/assets/cta.css";
import downloadIcon from "@vtapp/assets/dowload-icon.svg";
import Link from "next/link";
import Image from "next/image";

function Buttons() {
  return (
    <div className="buttons">
      <Link
        className="button button--mimas"
        target="_blank"
        rel="noopener noreferrer"
        href="https://vtop1.vitap.ac.in/VTAPP/"
      >
        <span>Register now</span>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link className="button button--mimas" href="/tickets">
        <span className="bflex">Grab Tickets</span>
      </Link>
    </div>
  );
}

export default Buttons;
