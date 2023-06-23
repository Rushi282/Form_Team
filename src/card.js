import React from "react";
import "./card.css";

export default function Card({
  name,
  lastname,
  gender,
  emailId,
  available,
  domain,
  avatar,
}) {
  return (
    <div className="container style">
      <div className="row">
        <div className="col-xl-8">
          <label>Candidate Name:</label>
          <label>{name + " " + lastname}</label>
          <br />

          <label>Email Id:</label>
          <label>{emailId}</label>
          <br />
          <label>Gender:</label>
          <label>{gender}</label>
          <br />
          <label>Avilablity:</label>
          {available && <label>Available</label>}
          {!available && <label>UnAvailable</label>}
          <br />

          <label>Domain:</label>
          <label>{domain}</label>
        </div>
        <div className="col-xl-2">
          <img src={avatar} />
        </div>
      </div>
    </div>
  );
}
