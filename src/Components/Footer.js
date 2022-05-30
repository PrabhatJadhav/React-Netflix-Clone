import React from "react";

function Footer() {
  return (
    <div className="container-fluid pb-5 bg-footer">
      <div className="row justify-content-between">
        <div className="col">
          <div className="row">
            <a className="mt-4 color-white" href="#">
              {" "}
              FAQ{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Privacy{" "}
            </a>
            <a
              href="https://www.flaticon.com/free-icons/right"
              title="right icons"
            >
              Right icons created by Pixel perfect - Flaticon
            </a>
            <a
              href="https://www.flaticon.com/free-icons/plus"
              title="plus icons"
            >
              Plus icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <a className="mt-4 color-white" href="#">
              {" "}
              Help Center{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Jobs{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Cookie{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Legal{" "}
            </a>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <a className="mt-4 color-white" href="#">
              {" "}
              Terms of Use{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Media Center{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Only On MediaFlix{" "}
            </a>
            <a className="mt-4 color-white" href="#">
              {" "}
              Corporate Information{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
