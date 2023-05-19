import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:hraza486767@gmail.com">
        <Button>Contact: hraza486767@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;