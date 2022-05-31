import React from "react";

function Footer() {
  return (
    <div className="container-fluid pb-5 bg-footer">
      <div className="row justify-content-between">
        <div className="col">
          <div className="row">
            <a className="mt-4 " href="#">
              {" "}
              FAQ{" "}
            </a>
            <a className="mt-4 " href="#">
              {" "}
              Privacy{" "}
            </a>
            <a
              className="mt-4"
              href="https://www.flaticon.com/free-icons/check"
              title="check icons"
            >
              Check icons created by Ilham Fitrotul Hayat - Flaticon
            </a>
            <a
              className="mt-4"
              href="https://www.flaticon.com/free-icons/add"
              title="add icons"
            >
              Add icons created by Ilham Fitrotul Hayat - Flaticon
            </a>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <a className="mt-4 " href="#">
              {" "}
              Help Center{" "}
            </a>
            <a className="mt-4 " href="#">
              {" "}
              Jobs{" "}
            </a>
            <a className="mt-4 " href="#">
              {" "}
              Cookie{" "}
            </a>
            <a className="mt-4 " href="#">
              {" "}
              Legal{" "}
            </a>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <a className="mt-4 " href="#">
              {" "}
              Terms of Use{" "}
            </a>
            <a className="mt-4 " href="#">
              {" "}
              Media Center{" "}
            </a>
            <a className="mt-4 " href="#">
              {" "}
              Only On MediaFlix{" "}
            </a>
            <a className="mt-4 " href="#">
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
