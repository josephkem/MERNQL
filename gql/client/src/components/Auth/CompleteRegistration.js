import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function CompleteRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
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
  );
}

export default CompleteRegistration;
