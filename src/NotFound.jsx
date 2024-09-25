import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "/src/assets/404.png";

function NotFound() {
  return (
    <section className="notfound">
      <img src={notFoundImage} alt="" />
      <p>
        Well, it seems the resource or page you're looking for does not exist
        anymore. And you're not exactly where you're supposed to be, so please
        go back to home.
      </p>
      <Link to={"/"}>Back to Home</Link>
    </section>
  );
}

export default NotFound;
