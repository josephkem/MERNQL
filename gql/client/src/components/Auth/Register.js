import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_GRAPHQL_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };

    const result = await sendSignInLinkToEmail(auth, email, config);
    // console.log("result", result);

    //show notification

    //save user email
    window.localStorage.setItem("emailFormRegistration", email);

    //clear email from the state
    setEmail("");
    setLoading(false);
  };

  return (
    <div className="container p-5">
      <h4>Register</h4>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
            disabled={loading}
          />
        </div>
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Register;
