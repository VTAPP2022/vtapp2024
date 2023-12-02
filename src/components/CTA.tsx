import "@vtapp/assets/cta.css";
import downloadIcon from "@vtapp/assets/dowload-icon.svg";
import Link from "next/link";
import Image from "next/image";

function Buttons() {
  return (
    <div className="buttons">
      <Link
        className="button button--mimas hover:cursor-not-allowed"
        target="_blank"
        rel="noopener noreferrer"
        href=""
      >
        <span>Register now</span>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link
        className="button button--mimas"
        href="https://drive.google.com/file/d/1cQrQi80YcAwKZEKZXhTUYP2baVE3FDRM/view?usp=drivesdk"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="bflex">
          Brochure &nbsp; <Image src={downloadIcon} alt="download icon" />
        </span>
      </Link>
    </div>
  );
}

export default Buttons;
